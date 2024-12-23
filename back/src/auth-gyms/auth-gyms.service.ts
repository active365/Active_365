import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Gyms } from 'src/entities/gyms.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthGymsService {
  constructor(
    @InjectRepository(Gyms) private readonly gymsRepository: Repository<Gyms>,
    private readonly emailService: EmailService,
  ){}
    
    async loginGym(email: string, passwordLogin: string, isGoogleLogin: boolean = false) {
      const gym = await this.gymsRepository.findOne({ where: { email: email } });
      if (!gym) throw new NotFoundException(`Credenciales incorrectas`);
  
      const hashToCompare = isGoogleLogin ? gym.googlePassword : gym.password;
      if (!hashToCompare) throw new NotFoundException(`Credenciales incorrectas`);
  
      const isMatch = await bcrypt.compare(passwordLogin, hashToCompare);
      if (!isMatch) throw new NotFoundException(`Credenciales incorrectas`);
      const { password, googlePassword, ...gymWithoutPassword } = gym;
      return gymWithoutPassword;
  }
  
  async createGym(gym: Partial<Gyms>, isGoogleCreate: boolean = false) {
    const gymFound = await this.gymsRepository.findOne({ where: { email: gym.email } });
    if (gymFound) throw new BadRequestException(`El email ${gym.email} ya existe`);

    const passwordToHash = isGoogleCreate ? gym.googlePassword : gym.password;
    if (!passwordToHash) {
        throw new BadRequestException('Se requiere una contraseña para crear el usuario');
    }

    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const newGym = this.gymsRepository.create({
        ...gym,
        password: isGoogleCreate ? undefined : hashedPassword,
        googlePassword: isGoogleCreate ? hashedPassword : undefined,
    });

    if (!newGym) throw new BadRequestException('No se pudo crear el usuario');

    const savedGym = await this.gymsRepository.save(newGym);

    const { password, googlePassword, ...gymWithoutPassword } = savedGym;

    await this.emailService.sendWelcomeGymEmail(savedGym.email, savedGym.name);
    return gymWithoutPassword;
}

  async validateGoogleGym(googleGym: Partial<Gyms>) {
    const gymFound = await this.gymsRepository.findOne({ where: { email: googleGym.email } });
    if (gymFound) return gymFound;
    return await this.createGym(googleGym, true);
  }
}
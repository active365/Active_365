import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Gyms } from 'src/entities/gyms.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthGymsService {
  constructor(
    @InjectRepository(Gyms) private readonly gymsRepository: Repository<Gyms>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ){}
  
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
    let userOrGym: Users | Gyms = await this.userRepository.findOne({ where: { email: googleGym.email } });
    if(userOrGym) throw new BadRequestException(`The email ${googleGym.email} is currently registered as a user`);

    userOrGym = await this.gymsRepository.findOne({ where: { email: googleGym.email } });
    if(userOrGym) return userOrGym;
    return await this.createGym(googleGym, true);
  }
}
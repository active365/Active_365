import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Gyms } from 'src/entities/gyms.entity';

@Injectable()
export class AuthUsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Gyms) private readonly gymRepository: Repository<Gyms>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ){}
    
  async login(email: string, passwordLogin: string, isGoogleLogin: boolean = false) {
    let userOrGym: Users | Gyms = await this.userRepository.findOne({ where: { email: email } });

    if (!userOrGym) {
      userOrGym = await this.gymRepository.findOne({ where: { email: email } });
    }
    
    if (!userOrGym) throw new NotFoundException(`Incorrect credentials`);
  
    const hashToCompare = isGoogleLogin ? userOrGym.googlePassword : userOrGym.password;
    if (!hashToCompare) throw new NotFoundException(`Incorrect credentials`);
  
    const isMatch = await bcrypt.compare(passwordLogin, hashToCompare);
    if (!isMatch) throw new NotFoundException(`Incorrect credentials`);
  
    const userPayload = {
      id: userOrGym.id,
      email: userOrGym.email,
      rol: userOrGym.rol 
    }
    const token = this.jwtService.sign(userPayload);
    return {
      message: 'Login successful',
      token,
      user: userPayload
    }
  }
  
  
  async createUser(user: Partial<Users>, isGoogleCreate: boolean = false) {
    const userFound = await this.userRepository.findOne({ where: { email: user.email } });
    if (userFound) throw new BadRequestException(`The email ${user.email} already exists`);

    const passwordToHash = isGoogleCreate ? user.googlePassword : user.password;
    if (!passwordToHash) {
        throw new BadRequestException('A password is required to create the user');
    }

    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const newUser = this.userRepository.create({
        ...user,
        password: isGoogleCreate ? undefined : hashedPassword,
        googlePassword: isGoogleCreate ? hashedPassword : undefined,
    });

    if (!newUser) throw new BadRequestException('Failed to create user');

    const savedUser = await this.userRepository.save(newUser);

    const { password, googlePassword, ...userWithoutPassword } = savedUser;
    await this.emailService.sendWelcomeEmail(savedUser.email, savedUser.name);

    return userWithoutPassword;
}

  async validateGoogleUser(googleUser: Partial<Users>) {
    let userOrGym: Users | Gyms =  await this.gymRepository.findOne({ where: { email: googleUser.email } });
    if(userOrGym) throw new BadRequestException(`The email ${googleUser.email} is currently registered as a gym`);
    
    userOrGym = await this.userRepository.findOne({ where: { email: googleUser.email } });
    if(userOrGym) return userOrGym;
    return await this.createUser(googleUser, true);
  }
}

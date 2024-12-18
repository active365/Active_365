import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>){}
    
    async loginUser(email: string, passwordLogin: string, isGoogleLogin: boolean = false) {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) throw new NotFoundException(`Credenciales incorrectas`);
  
      const hashToCompare = isGoogleLogin ? user.googlePassword : user.password;
      if (!hashToCompare) throw new NotFoundException(`Credenciales incorrectas`);
  
      const isMatch = await bcrypt.compare(passwordLogin, hashToCompare);
      if (!isMatch) throw new NotFoundException(`Credenciales incorrectas`);
      const { password, googlePassword, ...userWithoutPassword } = user;
      return userWithoutPassword;
  }
  
  async createUser(user: Partial<Users>, isGoogleCreate: boolean = false) {
    const userFound = await this.userRepository.findOne({ where: { email: user.email } });
    if (userFound) throw new BadRequestException(`El email ${user.email} ya existe`);

    const passwordToHash = isGoogleCreate ? user.googlePassword : user.password;
    if (!passwordToHash) {
        throw new BadRequestException('Se requiere una contraseña para crear el usuario');
    }

    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const newUser = this.userRepository.create({
        ...user,
        password: isGoogleCreate ? undefined : hashedPassword,
        googlePassword: isGoogleCreate ? hashedPassword : undefined,
    });

    if (!newUser) throw new BadRequestException('No se pudo crear el usuario');

    const savedUser = await this.userRepository.save(newUser);

    const { password, googlePassword, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
}

  async validateGoogleUser(googleUser: Partial<Users>) {
    const userFound = await this.userRepository.findOne({ where: { email: googleUser.email } });
    if (userFound) return userFound;
    return await this.createUser(googleUser, true);
  }
}

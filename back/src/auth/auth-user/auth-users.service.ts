import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService){}
    
    async loginUser(email: string, passwordLogin: string, isGoogleLogin: boolean = false) {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) throw new NotFoundException(`Incorrect credentials`);
  
      const hashToCompare = isGoogleLogin ? user.googlePassword : user.password;
      if (!hashToCompare) throw new NotFoundException(`Incorrect credentials`);
  
      const isMatch = await bcrypt.compare(passwordLogin, hashToCompare);
      if (!isMatch) throw new NotFoundException(`Incorrect credentials`);

      const userPayload = {
        id: user.id,
        email: user.email,
        rol: user.rol 
      }
      const token = this.jwtService.sign(userPayload);
      return {
        message: 'Login successful',
        token
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
    return userWithoutPassword;
}

  async validateGoogleUser(googleUser: Partial<Users>) {
    const userFound = await this.userRepository.findOne({ where: { email: googleUser.email } });
    if (userFound) return userFound;
    return await this.createUser(googleUser, true);
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Gyms } from 'src/entities/gyms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), 
            TypeOrmModule.forFeature([Gyms])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

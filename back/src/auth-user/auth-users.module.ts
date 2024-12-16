import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/googleOauth.config';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { Type } from 'class-transformer';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forFeature(googleOauthConfig), TypeOrmModule.forFeature([Users])],
  controllers: [AuthUsersController],
  providers: [AuthUsersService, GoogleStrategy],
})
export class AuthUsersModule {}
 
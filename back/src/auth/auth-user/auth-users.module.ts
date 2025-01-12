import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/googleOauth.config';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategyForUsers } from 'src/strategies/googleUser.strategy';
import { EmailModule } from 'src/email/email.module';
import { Gyms } from 'src/entities/gyms.entity';

@Module({
  imports: [ConfigModule.forFeature(googleOauthConfig),
            TypeOrmModule.forFeature([Users]),
            TypeOrmModule.forFeature([Gyms]),
            EmailModule],
  controllers: [AuthUsersController],
  providers: [AuthUsersService, GoogleStrategyForUsers],
  exports: [AuthUsersService],
})
export class AuthUsersModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/googleOauth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGymsService } from './auth-gyms.service';
import { Gyms } from 'src/entities/gyms.entity';
import { AuthGymsController } from './auth-gyms.controller';
import { GoogleStrategyForGyms } from 'src/strategies/googleGym.strategy';

@Module({
  imports: [ConfigModule.forFeature(googleOauthConfig), 
            TypeOrmModule.forFeature([Gyms])],
  controllers: [AuthGymsController],
  providers: [AuthGymsService, GoogleStrategyForGyms],
})
export class AuthGymsModule {}
 
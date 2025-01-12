import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GoogleGymAuthGuard } from '../guards/googleGymAuth.guard';
import { CreateGymDto } from 'src/dto/create-gym.dto';
import { reverseAndMixEmail } from 'src/utils/generateGooglePassword.util';
import { AuthGymsService } from './auth-gyms.service';
import { AuthUsersService } from '../auth-user/auth-users.service';

@Controller('auth-gyms')
export class AuthGymsController {
  constructor(private readonly authGymsService: AuthGymsService,
              private readonly authUsersService: AuthUsersService
   ) {}

  @Post('signup')
  createUser(@Body() gym: CreateGymDto) {
    return this.authGymsService.createGym(gym);
  }

    @Get('google/login')
    @UseGuards(GoogleGymAuthGuard)
    googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleGymAuthGuard)
  async googleCallback(@Req() req) {
    if(req.user.email){
      const email = req.user.email;
      const password = reverseAndMixEmail(req.user.email);
      return this.authUsersService.login(email, password, true);
    }
    return {message: 'Faltan datos'}
  }
}

import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth/google-auth.guard';
import { CreateGymDto, LoginGymDto } from 'src/dto/create-gym.dto';
import { reverseAndMixEmail } from 'src/utils/generateGooglePassword.util';
import { AuthGymsService } from './auth-gyms.service';

@Controller('auth-gyms')
export class AuthGymsController {
  constructor(private readonly authGymsService: AuthGymsService ) {}

  @Post('signin')
  login(@Body() gymCredentials: LoginGymDto) {
    if( gymCredentials.email && gymCredentials.password ){
      const {email, password} = gymCredentials;
      return this.authGymsService.loginGym(email, password);
    }
    return {message: 'Faltan datos'}
  }
  @Post('signup')
  createUser(@Body() gym: CreateGymDto) {
    return this.authGymsService.createGym(gym);
  }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {}

  @Get('googleGym/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req) {
    if(req.user.email){
      const email = req.user.email;
      const password = reverseAndMixEmail(req.user.email);
      return this.authGymsService.loginGym(email, password, true);
    }
    return {message: 'Faltan datos'}
  }
}

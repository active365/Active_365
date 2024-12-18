import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/users.dto';
import {GoogleUserAuthGuard } from 'src/auth/guards/google-auth/googleUserAuth.guard';
import { reverseAndMixEmail } from 'src/utils/generateGooglePassword.util';


@Controller('auth-users')
export class AuthUsersController {
  constructor(private readonly authUsersService: AuthUsersService) {}

  @Post('signin')
  login(@Body() userCredentials: LoginUserDto) {
    if( userCredentials.email && userCredentials.password ){
      const {email, password} = userCredentials;
      return this.authUsersService.loginUser(email, password);
    }
    return {message: 'Faltan datos'}
  }
  @Post('signup')
  createUser(@Body() user: CreateUserDto) {
    return this.authUsersService.createUser(user);
  }

  @Get('google/login')
  @UseGuards(GoogleUserAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleUserAuthGuard)
  async googleCallback(@Req() req) {
    if(req.user.email){
      const email = req.user.email;
      const password = reverseAndMixEmail(req.user.email);
      return this.authUsersService.loginUser(email, password, true);
    }
    return {message: 'Faltan datos'}
  }
}

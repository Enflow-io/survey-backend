import { Body, Req, Controller, HttpCode, Post, UseGuards, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ChangePasswordDto } from './changePassword.dto';
import * as bcrypt from 'bcrypt';

import { AuthModule } from './auth.module';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthService,
  ) {
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    console.log('!!')

    // console.log(request);
    const user = request.user;
    const cookie = this.authenticationService.getJwtToken(user.id);
    user.password = undefined;

    // try {
    //   const log = Logger.create({
    //     moduleName: AuthModule.name,
    //     eventId: 'login',
    //     message: 'выполнен вход',
    //     logLevel: LogLevel.Info,
    //     user: user
    //   });
    //   await log.save();
    // }catch (e) {
    //   console.log("ERROR WHILE LOG WRITING", e.stack_trace)
    // }

    return { ...user, token: cookie };
  }


  @Get('public-route')
  async openRoute() {
    return {
      status: 'ok',
    };
  }

  @Get('private-route')
  @UseGuards(JwtAuthenticationGuard)
  async privateRoute() {
    return {
      status: 'Your see private route',
    };
  }

  @Patch('update-password')
  @UseGuards(JwtAuthenticationGuard)
  async updatePassword(@Req() request: RequestWithUser, @Body() changePasswordDto: ChangePasswordDto) {
    const user = request.user;
    const { password, newPassword } = changePasswordDto;

    await this.authenticationService.verifyPassword(password, user.password);

    await this.authenticationService.changePassword(user, newPassword);

    

    return {
      status: request.user,
    };
  }
}
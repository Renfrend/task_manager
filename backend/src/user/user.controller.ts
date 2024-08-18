import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AtGuard } from './guards/at.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: UserLoginDto) {
    return this.userService.login(loginUserDto);
  }

  @UseGuards(AtGuard)
  @Post('refresh-token')
  refreshToken(@Req() request: RequestWithUser) {
    return this.userService.refreshToken(request.user.id);
  }
}
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginDTO } from './dto/Login.dto';

import { AuthEntity } from './entities/auth.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import RegisterDto from './dto/Register.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('login')
  @ApiBody({ type: LoginDTO, description: 'Example login data.' })
  async login (@Body() userData: LoginDTO):Promise<AuthEntity>{
    return await this.authService.login(userData)
  }

  @ApiBody({type: RegisterDto, description: 'User registration data.'})
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @Post('register')
  async createUser(@Body() userData: RegisterDto){
    return await this.authService.registerNewUser(userData)
  }

}

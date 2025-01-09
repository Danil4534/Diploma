import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginDTO } from './dto/Login.dto';

import { AuthEntity } from './entities/auth.entity';
import { ApiBody, ApiResponse } from '@nestjs/swagger';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @ApiBody({ type: LoginDTO, description: 'Example login data.' })
  async login (@Body() userData: LoginDTO):Promise<AuthEntity>{
    return await this.authService.login(userData)
  }

  
  
}

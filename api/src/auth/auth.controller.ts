import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/Login.dto';
import { AuthEntity } from './entities/auth.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import RegisterDto from './dto/Register.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDTO, description: 'Example login data.' })
  async login(@Body() userData: LoginDTO): Promise<AuthEntity> {
    return await this.authService.login(userData);
  }

  @ApiBody({ type: RegisterDto, description: 'User registration data.' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() userData: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.authService.registerNewUser(
      userData,
      file.buffer,
      file.originalname,
    );
  }

  @Post('verify-otp/:userId/:otp')
  async verifyOtp(@Param('otp') otp: number, @Param('userId') userId: string) {
    return this.authService.verifyOtp(otp, userId);
  }

  @Post('logout/:userId')
  async logout(@Param('userId') userId: string) {
    return this.authService.logout(userId);
  }
}

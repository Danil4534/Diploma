import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';
import RegisterDto from './dto/Register.dto';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { $Enums } from '@prisma/client';
import { EmailService } from './otp/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  async login(userData: LoginDTO): Promise<AuthEntity> {
    const { email, password } = userData;
    const otpCode = this.generateOtpCode();
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: { email: email },
      });
      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password,
      );

      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }
      await this.emailService.sendToEmail({
        toEmail: email,
        username: foundUser.name,
        code: otpCode,
      });
      await this.prisma.user.update({
        where: { email: email },
        data: {
          activeStatus: $Enums.UserStatus.Online,
          otpCode: otpCode,
          otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      return {
        accessToken: this.jwtService.sign(
          { userId: foundUser },
          { expiresIn: '15m' },
        ),
        refreshToken: this.jwtService.sign(
          { userId: foundUser },
          { expiresIn: '30d' },
        ),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async verifyOtp(otp: number, userId: string): Promise<string> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!foundUser.otpCode || new Date(foundUser.otpExpiresAt) < new Date()) {
      throw new UnauthorizedException('OTP has expired or is invalid');
    }
    console.log(foundUser.otpCode);
    console.log(otp);
    if (foundUser.otpCode != otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { otpCode: null, otpExpiresAt: null },
    });
    return 'Success';
  }
  generateOtpCode(): number {
    return Math.floor(100000 + Math.random() * 90000);
  }
  async registerNewUser(userData: RegisterDto) {
    return this.userService.createNewUser(userData);
  }
}

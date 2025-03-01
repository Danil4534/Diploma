import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports:[PrismaModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, PrismaClient,JwtService ],
})
export class UserModule {}

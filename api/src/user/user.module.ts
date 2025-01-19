import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports:[PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaClient,JwtService, AuthService ],
})
export class UserModule {}

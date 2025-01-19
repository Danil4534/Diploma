import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaClient } from '@prisma/client';


@Module({
  imports:[],
  controllers: [UserController],
  providers: [UserService, PrismaClient],
})
export class UserModule {}

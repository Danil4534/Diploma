import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';

import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtStrategy)
  async findAll():Promise<User[]> {
    return this.userService.findAll();
  }
  
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtStrategy)
  async findUserById(@Param('id') id: string):Promise<User>{
    return this.userService.findUserById(id)
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtStrategy)
  async updateUserData(@Param('id') id: string, @Body() updateUserDTO:UpdateUserDto){
    return this.userService.updateUser(id, updateUserDTO)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtStrategy)
  async deleteUser (@Param('id') id: string){
    return this.userService.deleteUser(id)

  }

}

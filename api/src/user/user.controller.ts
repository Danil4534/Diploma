import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get()
  async findAll():Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string):Promise<User>{
    return this.userService.findUserById(id)
  }

  @Put(':id')
  async updateUserData(@Param('id') id: string, @Body() updateUserDTO:UpdateUserDto){
    return this.userService.updateUser(id, updateUserDTO)
  }

}

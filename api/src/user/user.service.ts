import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient, private authService: AuthService){}
 

  async findAll():Promise<any> {
    const findAllUsers = await this.prisma.user.findMany()
    return findAllUsers
  }

  async findUserById (id:string):Promise<User>{
    const findUser= await this.prisma.user.findFirst({where:{id:id}})
    if(!findUser){
      throw new HttpException('',HttpStatus.NOT_FOUND)
    }
    return findUser
  }
 
  async updateUser(id:string, updateUserDto:UpdateUserDto):Promise<User>{
    updateUserDto.password = await this.authService.hashedPassword(updateUserDto.password)
    const updateUser = await this.prisma.user.update({where:{id}, data: updateUserDto})
    return updateUser 

  }

  async deleteUser(id:string):Promise<User>{
    const deleteUser = await this.prisma.user.delete({where:{id}})
    return deleteUser

  }
}

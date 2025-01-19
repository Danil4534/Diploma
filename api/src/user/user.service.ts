import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient){}
 

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
 
  async updateUser(id:string, updateUserDto:UpdateUserDto){
    try{
      const updateUser = await this.prisma.user.update({where:{id}, data: updateUserDto})
      return updateUser 
    }catch(e){
      throw new HttpException('', HttpStatus.NOT_FOUND)
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import RegisterDto from 'src/auth/dto/Register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient){}
 

  async findAll(): Promise<any> {
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
  
  async createNewUser(userData:RegisterDto){
    const {email} = userData
    try{
      const exitUser = await this.prisma.user.findFirst({where:{email:email}})
      if(exitUser){
        throw new HttpException("This user is exist", HttpStatus.BAD_REQUEST) 
      }
      userData.password = await this.hashedPassword(userData.password) 
      await this.prisma.user.create({
        data: userData
      })
    }catch(e){
      console.log(e)
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async hashedPassword(password):Promise<string>{
    const hashedPassword = await bcrypt.hash(password, 10) 
    return hashedPassword
  }


  async updateUser(id:string, updateUserDto:UpdateUserDto):Promise<User>{
    updateUserDto.password = await this.hashedPassword(updateUserDto.password)
    const updateUser = await this.prisma.user.update({where:{id}, data: updateUserDto})
    return updateUser 

  }

  async deleteUser(id:string):Promise<User>{
    const deleteUser = await this.prisma.user.delete({where:{id}})
    return deleteUser

  }
}

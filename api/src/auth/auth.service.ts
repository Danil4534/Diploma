import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';
import RegisterDto from './dto/Register.dto';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService){}


  async login(userData:LoginDTO): Promise<AuthEntity>{
    const {email, password }= userData
    try{
      const foundUser = await this.prisma.user.findUnique({where:{email:email}})
      const isPasswordValid = await bcrypt.compare( password, foundUser.password)
      if(!isPasswordValid){
      throw new NotFoundException('Invalid password');
    }
    return {
      accessToken:this.jwtService.sign({userId: foundUser})
    }
    }catch(e){
      console.log(e)
    }
    
  }

  async register(userData:RegisterDto){
    try{
      const foundUser = await this.prisma.user.findFirst({where:{email: userData.email}})
      if(!foundUser){
        userData.password =  await this.hashedPassword(userData.password)
        console.log(userData)
        return this.prisma.user.create({
        data: userData
      })
      }
    }catch(e){
      console.log(e)
    }
  }

  async hashedPassword(password):Promise<string>{
    const hashedPassword = await bcrypt.hash(password, 10) 
    return hashedPassword
  }
}

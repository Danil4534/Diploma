import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';
import RegisterDto from './dto/Register.dto';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private userService:UserService){}


  async login(userData:LoginDTO): Promise<AuthEntity>{
    const { email, password }= userData
    try{
      const foundUser = await this.prisma.user.findUnique({where:{email:email}})
      const isPasswordValid = await bcrypt.compare( password, foundUser.password)
      if(!isPasswordValid){
      throw new NotFoundException('Invalid password');
    }
    return {
      accessToken:this.jwtService.sign({userId: foundUser},{expiresIn:"15m"}),
      refreshToken:this.jwtService.sign({userId: foundUser},{expiresIn:"30d"})
    }
    }catch(e){
      console.log(e)
    }
    
  }

  async registerNewUser(userData:RegisterDto){
      return this.userService.createNewUser(userData)
  }
}

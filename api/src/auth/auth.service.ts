import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';
import { NotFoundError } from 'rxjs';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService){}



  async login(userData:LoginDTO){
    console.log(userData)
    const {email, password }= userData
    
    const loginStudentUser = await this.prisma.student.findUnique({where: {email:email}})
    const loginParentUser = await this.prisma.parent.findUnique({where:{email:email}})
    const loginTeacherUser =  await this.prisma.teacher.findUnique({where:{email:email}})
    const loginAdminUser = await this.prisma.admin.findUnique({where:{email:email}})

    if (!loginStudentUser && !loginParentUser && !loginTeacherUser && !loginAdminUser) {
      throw new HttpException('No user found for this email', HttpStatus.NOT_FOUND);
    }
    const foundUser =  loginStudentUser ||
    loginParentUser ||
    loginTeacherUser ||
    loginAdminUser;

    const isPasswordValid = foundUser.password === password

    if(!isPasswordValid){
      throw new NotFoundException('Invalid password');
    }
    return {
      accessToken:this.jwtService.sign({userId: foundUser.id})
    }
  }
}

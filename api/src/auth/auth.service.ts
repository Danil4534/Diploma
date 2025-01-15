import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';
import { NotFoundError } from 'rxjs';
import RegisterDto from './dto/Register.dto';
import { AuthEntity } from './entities/auth.entity';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService){}


  async login(userData:LoginDTO): Promise<AuthEntity>{
    const {email, password }= userData
    const loginStudentUser = await this.prisma.student.findFirst({where: {email:email}})
    const loginParentUser = await this.prisma.parent.findFirst({where:{email:email}})
    const loginTeacherUser =  await this.prisma.teacher.findFirst({where:{email:email}})
    const loginAdminUser = await this.prisma.admin.findFirst({where:{email:email}})

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

  async register(userData:RegisterDto){
    const {email} = userData
    const existingStudentUser = await this.prisma.student.findUnique({where: {email:email}})
    const existingParentUser = await this.prisma.parent.findUnique({where:{email:email}})
    const existingTeacherUser =  await this.prisma.teacher.findUnique({where:{email:email}})
    const existingAdminUser = await this.prisma.admin.findUnique({where:{email:email}})
    if (existingAdminUser && existingParentUser && existingStudentUser && existingTeacherUser) {
      throw new HttpException('User already exists with this email', HttpStatus.BAD_REQUEST);
    }
    
  }
}

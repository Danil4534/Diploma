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
      accessToken:this.jwtService.sign({userId: foundUser},{expiresIn:"15m"}),
      refreshToken:this.jwtService.sign({userId: foundUser},{expiresIn:"30d"})
    }
    }catch(e){
      console.log(e)
    }
    
  }

  async createUser(userData:RegisterDto, roles){
    userData.password = await this.hashedPassword(userData.password)
    const createdUser = await this.prisma.user.create({
      data:userData 
    })


    for (const role of roles.split(",")) {
      switch (role) {
        case "admin":
          await this.prisma.admin.create({
            data: {
              userId: createdUser.id,
              phone: userData.phone,
              address: userData.address,
              img: userData.img,
              created: userData.created,
            },
          });
          break;
        case "student":
          await this.prisma.student.create({
            data: {
              userId: createdUser.id, 
              phone: userData.phone || null, 
              address: userData.address || null,
              img: userData.img || null,
              created: userData.created || new Date(),
              sex: userData.sex || null,
              groupId: null, 
              parentId: null,
              info: null,
              
            },
          });
          break;
        case "teacher":
          await this.prisma.teacher.create({
            data: {
              userId: createdUser.id,
              phone: userData.phone,
              address: userData.address,
              img: userData.img,
              created: userData.created,
              info: null, 
              sex: userData.sex
            },
          });
          break;
        case "parent":
          await this.prisma.parent.create({
            data: {
              userId: createdUser.id,
              phone: userData.phone,
              address: userData.address,
              img: userData.img,
              created: userData.created,
              info: null,
              sex:userData.sex
            },
          });
          break;
        default:
          console.warn(`Unknown role: ${role}`);
      }
    }}

  async hashedPassword(password):Promise<string>{
    const hashedPassword = await bcrypt.hash(password, 10) 
    return hashedPassword
  }
}

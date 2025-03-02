import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Prisma, PrismaClient, User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import RegisterDto from 'src/auth/dto/Register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<any> {
    const { skip, take, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  parseTypes(where, orderBy, skip, take) {
    let parsedWhere: Prisma.UserWhereInput | undefined;
    let parsedOrderBy: Prisma.UserOrderByWithRelationInput | undefined;
    let parsedSkip: number | undefined;
    let parsedTake: number | undefined;
    parsedWhere = where ? JSON.parse(where) : undefined;
    parsedWhere = where ? JSON.parse(where) : undefined;
    parsedOrderBy = orderBy ? JSON.parse(orderBy) : undefined;
    parsedSkip = skip ? parseInt(skip, 10) : 0;
    parsedTake = take ? parseInt(take, 10) : undefined;

    let parsedData = {
      where: parsedWhere,
      orderBy: parsedOrderBy,
      skip: parsedSkip,
      take: parsedTake,
    };
    return parsedData;
  }

  async findUserById(id: string): Promise<User> {
    const findUser = await this.prisma.user.findFirst({
      where: { id: id },
      include: { Comment: true },
    });
    if (!findUser) {
      throw new HttpException(
        'User with this id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return findUser;
  }

  async createNewUser(userData: RegisterDto) {
    const { email } = userData;
    try {
      const exitUser = await this.prisma.user.findFirst({
        where: { email: email },
      });
      if (exitUser) {
        throw new HttpException('This user is exist', HttpStatus.BAD_REQUEST);
      }
      userData.password = await this.hashedPassword(userData.password);
      await this.prisma.user.create({
        data: userData,
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hashedPassword(password): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async updateUser(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      const updateUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return updateUser;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(where): Promise<User> {
    try {
      const deleteUser = await this.prisma.user.delete({ where });
      return deleteUser;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

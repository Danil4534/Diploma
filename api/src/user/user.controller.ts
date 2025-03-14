import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<User[]> {
    try {
      const parsedData = await this.userService.parseTypes(
        where,
        orderBy,
        skip,
        take,
      );
      return this.userService.findAll({
        where: parsedData.where,
        orderBy: parsedData.orderBy,
        skip: parsedData.skip,
        take: parsedData.take,
      });
    } catch (error) {
      throw new HttpException(
        'Invalid query parameters',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  async updateUserData(
    @Param('id') id: string,
    @Body() updateUserDTO: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser(id, updateUserDTO);
  }

  @Delete(':id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

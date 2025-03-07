import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Group, Prisma, PrismaClient } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserService } from 'src/user/user.service';

@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiBody({
    description: 'Create a new group',
  })
  @ApiResponse({
    status: 201,
    description: 'The group has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({ type: CreateGroupDto })
  async create(@Body() createGroupDto: Prisma.GroupCreateInput) {
    return await this.groupService.createGroup(createGroupDto);
  }

  @Get()
  async findAllGroups(
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<Group[]> {
    try {
      const parsedData = await this.groupService.parseTypes(
        where,
        orderBy,
        skip,
        take,
      );
      return this.groupService.findAllGroups({
        where: parsedData.where,
        orderBy: parsedData.orderBy,
        skip: parsedData.skip,
        take: parsedData.take,
      });
    } catch (e) {
      throw new HttpException(
        'Invalid query parameters',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('getStudents/:id')
  async findUsersInGroup(@Param('groupId') groupId: string) {
    return await this.groupService.findUsersIntoGroup(groupId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findGroupById(id);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateGroupDto,
    description: 'Update group data',
  })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}

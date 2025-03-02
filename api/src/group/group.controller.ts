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
} from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Group, Prisma } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiBody({
    type: CreateGroupDto,
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
  async create(@Body() createGroupDto: Prisma.GroupCreateInput) {
    return await this.groupService.createGroup(createGroupDto);
  }

  @Get()
  async findAll(
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<Group[]> {
    let parsedWhere: Prisma.GroupWhereInput | undefined;
    let parsedOrderBy: Prisma.GroupOrderByWithRelationInput | undefined;
    let parsedSkip: number | undefined;
    let parsedTake: number | undefined;

    try {
      parsedWhere = where ? JSON.parse(where) : undefined;
      parsedOrderBy = orderBy ? JSON.parse(orderBy) : undefined;
      parsedSkip = skip ? parseInt(skip, 10) : undefined;
      parsedTake = take ? parseInt(take, 10) : undefined;
      return this.groupService.findAllGroups({
        where: parsedWhere,
        orderBy: parsedOrderBy,
        skip: parsedSkip,
        take: parsedTake,
      });
    } catch (error) {
      throw new HttpException(
        'Invalid query parameters',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findGroupById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: Prisma.GroupUpdateInput,
  ) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupService.remove(id);
  // }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from './entities/group.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(createGroupDto: Prisma.GroupCreateInput) {
    try {
      const existGroup = await this.prisma.group.findFirst({
        where: { name: createGroupDto.name },
      });

      if (existGroup) {
        throw new HttpException(
          'The group with this name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.group.create({
        data: createGroupDto,
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findUsersIntoGroup(groupId: string) {
    return await this.prisma.group.findMany({
      where: { id: groupId },
      include: { students: true },
    });
  }
  async findAllGroups(params: {
    skip?: number;
    take?: number;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    return this.prisma.group.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findGroupById(id: string): Promise<Group> {
    try {
      const group = await this.prisma.group.findFirst({ where: { id: id } });
      return group;
    } catch (e) {
      throw new HttpException('Invalid group', HttpStatus.BAD_REQUEST);
    }
  }

  async updateGroup(id: string, updateGroupDto: Prisma.GroupUpdateInput) {
    try {
      const updateGroup = await this.prisma.group.update({
        where: { id },
        data: updateGroupDto,
      });
      return updateGroup;
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: string) {
    try {
      const deleteGroup = await this.prisma.group.findFirst({
        where: { id: id },
      });
      if (deleteGroup) {
        await this.prisma.group.delete({ where: { id: id } });
      }
    } catch (e) {
      throw new HttpException(
        'Error with deleting this group',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  parseTypes(where, orderBy, skip, take) {
    let parsedWhere: Prisma.GroupWhereInput | undefined;
    let parsedOrderBy: Prisma.GroupOrderByWithRelationInput | undefined;
    let parsedSkip: number | undefined;
    let parsedTake: number | undefined;

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
}

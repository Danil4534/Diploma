import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async findOneLesson(id: string): Promise<Lesson> {
    try {
      const lesson = await this.prisma.lesson.findFirst({ where: { id: id } });
      return lesson;
    } catch (e) {
      throw new HttpException('Invalid found lesson', HttpStatus.BAD_REQUEST);
    }
  }

  parseTypes(where, orderBy, skip, take) {
    let parsedWhere: Prisma.LessonWhereInput | undefined;
    let parsedOrderBy: Prisma.LessonOrderByWithRelationInput | undefined;
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

  async findAllLessons(params: {
    skip?: number;
    take?: number;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;

    return this.prisma.lesson.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { tasks: true, Subject: true },
    });
  }

  async create(createLessonDto: Prisma.LessonCreateInput) {
    try {
      const existLesson = this.prisma.lesson.findFirst({
        where: { id: createLessonDto.id },
      });
      if (existLesson) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const newLesson = await this.prisma.lesson.create({
        data: createLessonDto,
      });
      return newLesson;
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all lesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}

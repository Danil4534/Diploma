import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Event } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async findAllEvents(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    return this.prisma.event.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  parseTypes(where, orderBy, skip, take) {
    let parsedWhere: Prisma.EventWhereInput | undefined;
    let parsedOrderBy: Prisma.EventOrderByWithRelationInput | undefined;
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

  async createEvent(createEventDto: Prisma.EventCreateInput) {
    try {
      const existEvent = this.prisma.event.findFirst({
        where: { id: createEventDto.id },
      });
      if (existEvent) {
        throw new HttpException(
          'This event was created later',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const newEvent = await this.prisma.event.create({
        data: createEventDto,
      });
      return newEvent;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all event`;
  }

  async findOneEvent(id: string): Promise<Event> {
    try {
      const event = await this.prisma.event.findFirst({ where: { id } });
      return event;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

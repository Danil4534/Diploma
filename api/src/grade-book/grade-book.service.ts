import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GradeBookService {
  constructor(private prisma: PrismaService) {}

  async getAllSubjectGradesWithTasks(userId: string) {
    return this.prisma.gradeBook.findMany({
      where: { userId },
      include: {
        subject: {
          include: {
            tasks: {
              include: {
                TaskGrade: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
    });
  }
}

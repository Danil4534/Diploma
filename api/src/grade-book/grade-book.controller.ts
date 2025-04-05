import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GradeBookService } from './grade-book.service';

@Controller('grade-book')
export class GradeBookController {
  constructor(private readonly gradeBookService: GradeBookService) {}

  @Get('user/:userId/full-subjects')
  async getUserSubjectsWithTaskGrades(@Param('userId') userId: string) {
    return await this.gradeBookService.getAllSubjectGradesWithTasks(userId);
  }
}

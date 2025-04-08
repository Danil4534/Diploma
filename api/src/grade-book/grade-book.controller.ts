import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { GradeBookService } from './grade-book.service';
import { Response } from 'express';
@Controller('grade-book')
export class GradeBookController {
  constructor(private readonly gradeBookService: GradeBookService) {}

  @Get('user/:userId/full-subjects')
  async getUserSubjectsWithTaskGrades(@Param('userId') userId: string) {
    return await this.gradeBookService.getAllSubjectGradesWithTasks(userId);
  }
  @Get('grouped-export')
  async exportGroupedRatings(@Res() res: Response) {
    return this.gradeBookService.exportGroupedRatingsToExcel(res);
  }
}

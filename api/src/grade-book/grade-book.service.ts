import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

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

  async exportGroupedRatingsToExcel(res: Response) {
    const groups = await this.prisma.group.findMany({
      include: {
        students: {
          include: {
            TaskGrade: {
              include: {
                task: {
                  include: {
                    Subject: true,
                  },
                },
              },
            },
          },
        },
        subjects: true,
      },
    });

    const workbook = new ExcelJS.Workbook();

    for (const group of groups) {
      const worksheet = workbook.addWorksheet(`Group ${group.name}`);

      const subjectNames = group.subjects.map((subj) => subj.name);

      const headerRow = [
        'Student ID',
        'Name Surname',
        'Group',
        ...subjectNames,
        'Average',
      ];
      const header = worksheet.addRow(headerRow);
      const sheet = worksheet.getRow(1);
      sheet.font = { bold: true };
      sheet.eachCell((cell) => {
        cell.border = {
          bottom: { style: 'medium', color: { argb: '000000' } },
        };
      });
      header.eachCell((cell) => {
        cell.alignment = {
          textRotation: 90,
          vertical: 'bottom',
          horizontal: 'left',
          wrapText: true,
        };
      });

      for (const student of group.students) {
        const subjectGradesMap: Record<string, number[]> = {};

        for (const tg of student.TaskGrade) {
          const subject = tg.task?.Subject;
          if (!subject || subject.groupId !== group.id) continue;

          const subjectName = subject.name;
          if (!subjectGradesMap[subjectName]) {
            subjectGradesMap[subjectName] = [];
          }
          subjectGradesMap[subjectName].push(tg.grade);
        }

        const avgGrades = subjectNames.map((subjName) => {
          const grades = subjectGradesMap[subjName] || [];
          return grades.length
            ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2)
            : 'N/A';
        });

        const validGrades = avgGrades
          .filter((avg) => avg !== 'N/A')
          .map(Number);

        const overallAverage = validGrades.length
          ? (
              validGrades.reduce((a, b) => a + b, 0) / validGrades.length
            ).toFixed(2)
          : 'N/A';

        const row = worksheet.addRow([
          student.id,
          ` ${student.name ?? ''}  ${student.surname ?? ''}`,
          group.name,
          ...avgGrades,
          overallAverage,
        ]);
        row.eachCell((cell, colNumber) => {
          if (cell.value !== 'N/A') {
            const avgValue = parseFloat(cell.value as string);
            if (avgValue < 60) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF0000' },
              };
              cell.font = {
                color: { argb: 'FFFFFF' },
              };
            }
            if (avgValue > 60 && colNumber != 1) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ACE1AF' },
              };
              cell.font = {
                color: { argb: '1B4D3E' },
              };
            }
          }
        });
      }

      worksheet.columns?.forEach((col) => {
        col.width = 20;
      });
    }

    const filePath = join(__dirname, '..', '..', 'tmp', 'grouped-ratings.xlsx');
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, 'grouped-ratings.xlsx', () => {
      fs.unlinkSync(filePath);
    });
  }
}

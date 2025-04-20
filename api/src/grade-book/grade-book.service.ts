import { Subject } from './../subject/entities/subject.entity';
import { TaskGrade } from './../task-grade/entities/task-grade.entity';
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
    const result = await this.prisma.group.findMany({
      include: {
        students: {
          include: {
            TaskGrade: {
              select: {
                id: true,
                grade: true,
              },
            },
          },
        },
      },
    });

    return result;
  }

  async exportGroupRatingToExcel(groupId: string, res: Response) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
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

    if (!group) {
      res.status(404).send('Group not found');
      return;
    }

    const workbook = new ExcelJS.Workbook();
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

    const averageColIndex = headerRow.length;
    header.getCell(averageColIndex).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };

    header.eachCell((cell) => {
      cell.alignment = {
        vertical: 'bottom',
        horizontal: 'left',
        wrapText: true,
      };
    });

    const studentRows = [];

    for (const student of group.students) {
      const subjectGradesMap: Record<string, number[]> = {};

      for (const tg of student.TaskGrade) {
        const subject = tg.task?.Subject;
        if (!subject) continue;

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

      const validGrades = avgGrades.filter((avg) => avg !== 'N/A').map(Number);

      const overallAverage = validGrades.length
        ? (validGrades.reduce((a, b) => a + b, 0) / validGrades.length).toFixed(
            2,
          )
        : 'N/A';

      studentRows.push({
        rowData: [
          student.id,
          ` ${student.name ?? ''}  ${student.surname ?? ''}`,
          group.name,
          ...avgGrades,
          overallAverage,
        ],
        overallAverage:
          overallAverage === 'N/A' ? -1 : parseFloat(overallAverage),
      });
    }

    studentRows.sort((a, b) => b.overallAverage - a.overallAverage);

    for (const student of studentRows) {
      const row = worksheet.addRow(student.rowData);

      row.eachCell((cell, colNumber) => {
        if (colNumber === headerRow.length) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00' },
          };
          cell.font = {
            color: { argb: '000000' },
            bold: true,
          };
        } else if (cell.value !== 'N/A') {
          const avgValue = parseFloat(cell.value as string);
          if (avgValue < 60 && colNumber !== 1) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF0000' },
            };
            cell.font = {
              color: { argb: 'FFFFFF' },
            };
          } else if (avgValue > 60 && colNumber !== 1) {
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

    const filePath = join(
      __dirname,
      '..',
      '..',
      'tmp',
      `group-${group.name}-ratings.xlsx`,
    );
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, `group-${group.name}-ratings.xlsx`, () => {
      fs.unlinkSync(filePath);
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

      const averageColIndex = headerRow.length;
      header.getCell(averageColIndex).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' },
      };

      header.eachCell((cell) => {
        cell.alignment = {
          vertical: 'bottom',
          horizontal: 'left',
          wrapText: true,
        };
      });

      const studentRows = [];

      for (const student of group.students) {
        const subjectGradesMap: Record<string, number[]> = {};

        for (const tg of student.TaskGrade) {
          const subject = tg.task?.Subject;
          if (!subject) continue;

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

        studentRows.push({
          rowData: [
            student.id,
            ` ${student.name ?? ''}  ${student.surname ?? ''}`,
            group.name,
            ...avgGrades,
            overallAverage,
          ],
          overallAverage:
            overallAverage === 'N/A' ? -1 : parseFloat(overallAverage),
        });
      }
      studentRows.sort((a, b) => b.overallAverage - a.overallAverage);
      for (const student of studentRows) {
        const row = worksheet.addRow(student.rowData);

        row.eachCell((cell, colNumber) => {
          if (colNumber === headerRow.length) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFF00' },
            };
            cell.font = {
              color: { argb: '000000' },
              bold: true,
            };
          } else if (cell.value !== 'N/A') {
            const avgValue = parseFloat(cell.value as string);
            if (avgValue < 60 && colNumber !== 1) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF0000' },
              };
              cell.font = {
                color: { argb: 'FFFFFF' },
              };
            } else if (avgValue > 60 && colNumber !== 1) {
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

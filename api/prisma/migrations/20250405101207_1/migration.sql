/*
  Warnings:

  - Added the required column `grade` to the `GradeBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradeBook" ADD COLUMN     "grade" INTEGER NOT NULL;

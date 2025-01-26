/*
  Warnings:

  - Added the required column `info` to the `parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parent" ADD COLUMN     "info" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "info" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "position" TEXT NOT NULL;

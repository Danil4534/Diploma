/*
  Warnings:

  - Added the required column `info` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "info" TEXT NOT NULL;

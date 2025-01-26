/*
  Warnings:

  - Made the column `userId` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "student" ALTER COLUMN "userId" SET NOT NULL;

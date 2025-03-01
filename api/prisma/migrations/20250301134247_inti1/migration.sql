/*
  Warnings:

  - You are about to drop the column `subjectId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subjectId",
ALTER COLUMN "banned" SET DEFAULT false,
ALTER COLUMN "roles" SET DEFAULT ARRAY['Student']::"Role"[];

/*
  Warnings:

  - You are about to drop the column `userId` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "userId",
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "capacity" DROP NOT NULL;

/*
  Warnings:

  - The `otpCode` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "otpCode",
ADD COLUMN     "otpCode" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_otpCode_key" ON "User"("otpCode");

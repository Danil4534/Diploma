-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_subjectId_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activeStatus" SET DEFAULT 'Offline',
ALTER COLUMN "roles" SET DEFAULT ARRAY[]::"Role"[];

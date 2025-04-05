-- CreateTable
CREATE TABLE "TaskGrade" (
    "id" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskGrade_userId_taskId_key" ON "TaskGrade"("userId", "taskId");

-- AddForeignKey
ALTER TABLE "TaskGrade" ADD CONSTRAINT "TaskGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskGrade" ADD CONSTRAINT "TaskGrade_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

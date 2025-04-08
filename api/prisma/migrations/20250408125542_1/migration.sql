-- CreateTable
CREATE TABLE "TaskGroup" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "TaskGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskGroup" ADD CONSTRAINT "TaskGroup_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskGroup" ADD CONSTRAINT "TaskGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { PrismaClient, Role, UserSex, TypeTask } from '@prisma/client';
const prisma = new PrismaClient();

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedGroups() {
  return await Promise.all([
    prisma.group.create({
      data: { name: 'Group A', capacity: 15, status: 'New' },
    }),
    prisma.group.create({
      data: { name: 'Group B', capacity: 15, status: 'New' },
    }),
  ]);
}

async function seedUsers(count: number) {
  return await Promise.all(
    Array.from({ length: count }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `User${i + 1}`,
          surname: `Surname${i + 1}`,
          email: `user${i + 1}@example.com`,
          phone: `+123456789${i}`,
          password: 'hashed-password',
          roles: [Role.Student],
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        },
      }),
    ),
  );
}

async function assignUsersToGroups(users: any[], groups: any[]) {
  for (const user of users) {
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];
    await prisma.group.update({
      where: { id: randomGroup.id },
      data: {
        students: {
          connect: { id: user.id },
        },
      },
    });
  }
}

async function seedSubjects(groups: any[]) {
  const subjectNames = [
    'Math',
    'Science',
    'History',
    'Biology',
    'Physics',
    'Chemistry',
    'Literature',
    'Geography',
    'Art',
    'PE',
  ];

  return await Promise.all(
    subjectNames.map((name) => {
      const group = groups[Math.floor(Math.random() * groups.length)];
      return prisma.subject.create({
        data: {
          name,
          description: `Description for ${name}`,
          status: 'New',
          groupId: group.id,
        },
      });
    }),
  );
}

async function seedTasks(subjects: any[]) {
  return await Promise.all(
    subjects.flatMap((subject) =>
      ['Test', 'Quiz'].map((typeName, i) =>
        prisma.task.create({
          data: {
            title: `${typeName} for ${subject.name}`,
            description: `${typeName} description`,
            type: i === 0 ? TypeTask.Test : TypeTask.Default,
            grade: 100,
            subjectId: subject.id,
          },
        }),
      ),
    ),
  );
}

async function seedTaskGrades(users: any[], tasks: any[]) {
  for (const user of users) {
    for (const task of tasks) {
      await prisma.taskGrade.create({
        data: {
          userId: user.id,
          taskId: task.id,
          grade: getRandomInt(50, 100),
        },
      });
    }
  }
}

async function seedGradeBooks(users: any[], subjects: any[]) {
  for (const user of users) {
    for (const subject of subjects) {
      const grades = await prisma.taskGrade.findMany({
        where: {
          userId: user.id,
          task: { subjectId: subject.id },
        },
      });

      if (grades.length > 0) {
        const avg = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
        await prisma.gradeBook.create({
          data: {
            userId: user.id,
            subjectId: subject.id,
            grade: Math.round(avg),
          },
        });
      }
    }
  }
}

async function main() {
  console.log('🌱 Seeding database...');

  const groups = await seedGroups();
  const users = await seedUsers(20);
  await assignUsersToGroups(users, groups);

  const subjects = await seedSubjects(groups);
  const tasks = await seedTasks(subjects);

  await seedTaskGrades(users, tasks);
  await seedGradeBooks(users, subjects);

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

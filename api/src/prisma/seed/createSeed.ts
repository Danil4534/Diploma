import { PrismaClient, Role, UserSex, TypeTask } from '@prisma/client';

const prisma = new PrismaClient();

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function clearDatabase() {
  console.log('🧹 Clearing database...');
  await prisma.taskGrade.deleteMany();
  await prisma.gradeBook.deleteMany();
  await prisma.task.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();
  await prisma.group.deleteMany();
}

async function seedGroups() {
  console.log('📦 Seeding groups...');
  const groups = [
    { name: 'Group A', capacity: 15, status: 'New' },
    { name: 'Group B', capacity: 15, status: 'New' },
  ];
  await prisma.group.createMany({ data: groups });
  return prisma.group.findMany();
}

async function seedUsers(count: number) {
  console.log(`👤 Seeding ${count} users...`);
  const users = Array.from({ length: count }).map((_, i) => ({
    name: `User${i + 1}`,
    surname: `Surname${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `+123456789${i}`,
    password: 'hashed-password',
    roles: [Role.Student],
    sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
  }));

  return Promise.all(users.map((user) => prisma.user.create({ data: user })));
}

async function assignUsersToGroups(users: any[], groups: any[]) {
  console.log('🔗 Assigning users to groups...');
  return Promise.all(
    users.map((user) => {
      const group = groups[getRandomInt(0, groups.length - 1)];
      return prisma.user.update({
        where: { id: user.id },
        data: { groupId: group.id },
      });
    }),
  );
}

async function seedSubjects(groups: any[]) {
  console.log('📘 Seeding subjects...');
  const names = [
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

  return Promise.all(
    names.map((name) => {
      const group = groups[getRandomInt(0, groups.length - 1)];
      return prisma.subject.create({
        data: {
          name,
          description: `Description for ${name}`,
          groups: { connect: { id: group.id } },
        },
      });
    }),
  );
}

async function seedTasks(subjects: any[]) {
  console.log('📝 Seeding tasks...');
  return Promise.all(
    subjects.flatMap((subject) => [
      prisma.task.create({
        data: {
          title: `Test for ${subject.name}`,
          description: 'Test description',
          type: TypeTask.Test,
          grade: 100,
          subjectId: subject.id,
        },
      }),
      prisma.task.create({
        data: {
          title: `Default for ${subject.name}`,
          description: 'Default description',
          type: TypeTask.Default,
          grade: 100,
          subjectId: subject.id,
        },
      }),
    ]),
  );
}

async function seedTaskGrades(users: any[], tasks: any[]) {
  console.log('📊 Seeding task grades...');
  return Promise.all(
    users.flatMap((user) =>
      tasks.map((task) =>
        prisma.taskGrade.create({
          data: {
            userId: user.id,
            taskId: task.id,
            grade: getRandomInt(50, 100),
          },
        }),
      ),
    ),
  );
}

async function seedGradeBooks(users: any[], subjects: any[]) {
  console.log('📕 Seeding grade books...');
  for (const user of users) {
    for (const subject of subjects) {
      const grades = await prisma.taskGrade.findMany({
        where: {
          userId: user.id,
          task: { subjectId: subject.id },
        },
      });

      if (grades.length > 0) {
        const avgGrade = Math.round(
          grades.reduce((sum, g) => sum + g.grade, 0) / grades.length,
        );

        await prisma.gradeBook.create({
          data: {
            userId: user.id,
            subjectId: subject.id,
            grade: avgGrade,
          },
        });
      }
    }
  }
}

async function main() {
  try {
    console.log('🌱 Starting seeding process...');
    await clearDatabase();

    const groups = await seedGroups();
    const users = await seedUsers(20);
    await assignUsersToGroups(users, groups);

    const subjects = await seedSubjects(groups);
    const tasks = await seedTasks(subjects);

    await seedTaskGrades(users, tasks);
    await seedGradeBooks(users, subjects);

    console.log('✅ Database successfully seeded!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

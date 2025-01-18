import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    
  const admin = await prisma.admin.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpassword', 
    },
  })


  const parent = await prisma.parent.create({
    data: {
      username: 'parent1',
      name: 'Parent One',
      surname: 'Smith',
      email: 'parent1@example.com',
      password: 'parentpassword', 
      phone: '123-456-7890',
      address: '123 Parent St, Some City, Country',
    },
  })


  const teacher = await prisma.teacher.create({
    data: {
      name: 'Teacher One',
      surname: 'Jones',
      email: 'teacher1@example.com',
      password: 'teacherpassword',
      phone: '234-567-8901',
      address: '456 Teacher Ave, Some City, Country',
      sex: 'MALE',
      birthday: new Date('1985-05-15'),
    },
  })


  const student = await prisma.student.create({
    data: {
      name: 'Student One',
      surname: 'Taylor',
      email: 'student1@example.com',
      password: 'studentpassword', 
      phone: '345-678-9012',
      address: '789 Student Rd, Some City, Country',
      sex: 'FEMALE',
      parentId: parent.id
  
    },
  })

 


  console.log('Test users created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
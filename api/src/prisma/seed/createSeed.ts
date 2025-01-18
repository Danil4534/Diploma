import { PrismaClient, UserSex } from '@prisma/client'
import createTrigger from '../triggers/createUserTrigger'

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
          name: 'Mr.',
          surname: 'Smith',
          email: 'teacher1@example.com',
          phone: '22334455662',
          address: 'Teacher Blvd 101',
          img: null,
          sex: UserSex.MALE,
          created: new Date(),
          password: "", 
          role: ['STUDENT','ADMIN', 'TEACHER','PARENT']
        },
      })
    

  console.log('Seed data has been inserted!')
}

main()
// createTrigger()

  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
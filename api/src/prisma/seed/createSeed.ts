import { PrismaClient } from '@prisma/client'
import createTrigger from '../triggers/createUserTrigger'

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
          name: 'Mr.',
          surname: 'Smith',
          email: 'teacher@example.com',
          phone: '2233445566',
          address: 'Teacher Blvd 101',
          img: null,
          sex: 'MALE',
          created: new Date(),
          password: "", 
          role: ['STUDENT','ADMIN']
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
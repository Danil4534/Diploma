import { PrismaClient, UserSex } from '@prisma/client'
import { UserService } from '../../user/user.service'




const prisma = new PrismaClient()
const userService = new UserService(prisma)
async function main() {
   const hashedPassword =  await userService.hashedPassword("test")
    const user = await prisma.user.create({
        data: {
          name: 'Mr.',
          surname: 'Smith',
          email: 'teacher1@example.com',
          phone: '22334455662',
          img: null,
          sex: UserSex.MALE,
          created: new Date(),
          password: hashedPassword, 
         
        },
      })
    

  console.log('Seed data has been inserted!')
}

main()

  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
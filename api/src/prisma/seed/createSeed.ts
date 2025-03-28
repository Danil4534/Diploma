// import { PrismaClient, UserSex } from '@prisma/client'
// import { UserService } from '../../user/user.service'

// const prisma = new PrismaClient()
// const userService = new UserService(prisma)

// async function main() {
//    const hashedPassword =  await userService.hashedPassword("test")
//    const users = [
//     {
//       name: 'Mr.',
//       surname: 'Smith',
//       email: 'test@gmail.com',
//       phone: '22334234455662',
//       img: null,
//       sex: UserSex.MALE,
//       created: new Date(),
//       password: hashedPassword,
//     },
//     {
//       name: 'Mr.',
//       surname: 'Smith',
//       email: 'test1@gmail.com',
//       phone: '2233433254455662',
//       img: null,
//       sex: UserSex.MALE,
//       created: new Date(),
//       password: hashedPassword,
//     },
//     {
//       name: 'Mr.',
//       surname: 'Smith',
//       email: 'test2@gmail.com',
//       phone: '123',
//       img: null,
//       sex: UserSex.MALE,
//       created: new Date(),
//       password: hashedPassword,
//     },
//     {
//       name: 'Mr.',
//       surname: 'Smith',
//       email: 'test3@gmail.com',
//       phone: '2233445d5662',
//       img: null,
//       sex: UserSex.MALE,
//       created: new Date(),
//       password: hashedPassword,
//     },
//     {
//       name: 'Mr.',
//       surname: 'Smith',
//       email: 'test4@gmail.com',
//       phone: '22334451235662',
//       img: null,
//       sex: UserSex.MALE,
//       created: new Date(),
//       password: hashedPassword,
//     },
//   ]
//     await Promise.all(
//       users.map((user)=>prisma.user.create({
//         data: {
//           ...user,
//           img: null,
//           sex: UserSex.MALE,
//           created: new Date(),
//           password: hashedPassword,
//         },
//       }))

//     )

//   console.log('Seed data has been inserted!')
// }

// main()

//   .catch(e => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

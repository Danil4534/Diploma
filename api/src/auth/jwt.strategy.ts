// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { AuthService } from "./auth.service";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
//     constructor( private prisma:PrismaClient){
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey:  process.env.JWT
//         })
//     }

//     async validate(payload: {userId: string}){
//         const user = await this.prisma.user.findUnique({where:{id:payload.userId}})
//         if(!user){
//             throw new UnauthorizedException();
//         }
//         return user
//     }
// }
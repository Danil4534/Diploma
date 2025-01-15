import { ApiProperty } from "@nestjs/swagger"
import { UserSex } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"


export default class RegisterDto {
    @IsString()
    @ApiProperty({example:'David'})
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    surname:string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    img: string

    @IsEnum(UserSex)
    sex: UserSex

    @IsString()
    role: string

    @IsString()
    phone: string
    
    @IsString()
    address:string
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateGymDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
    })
    @ApiProperty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty()
    address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty()
    city: string;

    // @IsNotEmpty()
    // @IsNumber()
    // @ApiProperty()
    // latitude: number;

    // @IsNotEmpty()
    // @IsNumber()
    // @ApiProperty()
    // longitude: number;

}
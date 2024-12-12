import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, Validate } from "class-validator";

export class CreateUserDto  {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @IsIn(['registered', 'partner', 'member', 'admin'])
    rol: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    })
    password: string;

    @IsNumber()
  @IsPositive()
  @Min(50)
  @Max(250)
    height?: number;

    @IsNumber()
    @IsPositive()
    @Min(50)
    @Max(250)
    weight?: number;
    
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
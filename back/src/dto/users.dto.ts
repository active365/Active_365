import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, Validate } from "class-validator";

export class CreateUserDto  {
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

    //@IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    phone?: number;

    //@IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty()
    address?: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty()
    city?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsString()
    @ApiProperty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    })
    password: string;

    @IsNumber()
    @IsPositive()
    @Min(50)
    @Max(250)
    @ApiProperty()
    height?: number;

    @IsNumber()
    @IsPositive()
    @Min(50)
    @Max(250)
    @ApiProperty()
    weight?: number;
    
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
    
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
    'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;
}
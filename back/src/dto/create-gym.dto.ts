import { IsEmail, IsEmpty, IsIn, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { userRoles } from "src/enums/userRoles.enum";

export class CreateGymDto {

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
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
    })
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsInt()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @IsEmpty()
    @IsString()
    @MaxLength(15)
    @IsIn([userRoles.registered, userRoles.partner])
    rol: string;
}
export class LoginGymDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
      
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
  }
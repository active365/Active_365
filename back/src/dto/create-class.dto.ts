import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @Type(() => Date) 
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[8-9]|1[0-9]):([0-5][0-9])$/, {
    message: 'Time must be between 08:00 and 20:00',
  })
  time: string;

  @IsNotEmpty()
  @IsUUID()
  gymId: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  imgUrl: string;
}

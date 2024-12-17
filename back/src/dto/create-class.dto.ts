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

  @IsNotEmpty()
  @IsUUID()
  gymId: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  imgUrl: string;
}

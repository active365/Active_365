import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  duration: number;

  @IsNotEmpty()
  @Type(() => Date) 
  @IsDate()
  @ApiProperty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[8-9]|1[0-9]):([0-5][0-9])$/, {
    message: 'Time must be between 08:00 and 20:00',
  })
  @ApiProperty()
  time: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  gymId: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty()
  imgUrl: string;
}

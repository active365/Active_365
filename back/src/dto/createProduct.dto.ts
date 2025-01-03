import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, isString, IsString, IsUrl, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @ApiProperty()
    price: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    category: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    @IsUrl()
    imgUrl: string;

    @IsOptional()
    @IsString()
    subcategory: string;
}


export class FilterProductsDto {
    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    subcategory?: string; 
}
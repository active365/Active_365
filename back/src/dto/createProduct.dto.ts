import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsUrl()
    @IsNotEmpty()
    imgUrl: string;

    @IsString()
    @IsNotEmpty()
    category: string; 

}

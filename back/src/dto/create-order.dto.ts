import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProductOrderDto } from "./product-order.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @ApiProperty()
    @Type(() => ProductOrderDto)
    products: ProductOrderDto[];
}

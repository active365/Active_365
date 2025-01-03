import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsInt, Min } from "class-validator";

export class ProductOrderDto {
    @IsUUID()
    @ApiProperty()
    productId: string;

    @IsInt()
    @Min(1)
    @ApiProperty()
    quantity: number;
}

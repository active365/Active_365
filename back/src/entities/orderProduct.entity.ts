import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity({ name: "OrderProducts" })
export class OrderProduct {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Products, (product) => product.orderProducts, { eager: true })
    product: Products;

    @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.orderProducts, { onDelete: "CASCADE" })
    orderDetails: OrderDetails;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;
}

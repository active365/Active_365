import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Products } from "./products.entity";
import { Orders } from "./orders.entity";
@Entity({ name: 'OrderDetails' })
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @ManyToMany(() => Products)
    @JoinTable({ name: 'orderdetails_products' })
    product: Products[];

    @OneToOne(() => Orders, (order) => order.orderdetails)
    @JoinColumn()
    order: Orders;
}
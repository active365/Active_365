import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

import { Orders } from "./orders.entity";
import { OrderProduct } from "./orderProduct.entity";

@Entity({ name: 'OrderDetails' })
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    totalPrice: number;

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn()
    order: Orders;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.orderDetails, { cascade: true })
    orderProducts: OrderProduct[];
}

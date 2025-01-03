import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";
@Entity({name: 'Orders'})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    date: Date;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn()
    user: Users;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order, {cascade: true})
    @JoinColumn()
    orderDetails: OrderDetails;
}
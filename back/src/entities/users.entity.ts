import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { PrimaryGeneratedColumn } from "typeorm";
import { Gyms } from "./gyms.entity";
import { Orders } from "./orders.entity";
import { userRoles } from "src/enums/userRoles.enum";
@Entity({name: "Users"})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @Column({ type: 'bigint' })
    phone: number;

    @Column({ type: 'text' })
    address: string;
  
    @Column({ length: 50 })
    city: string;
    
    @Column({type: 'varchar', length: 15, nullable: false, default: userRoles.registered})
    rol: string;
    
    @Column({ type: 'float' })
    height?: number;

    @Column({ type: 'float' })
    weight?: number;

    @Column({ length: 100, nullable: false })
    password: string;

    @CreateDateColumn({ type: "date", nullable: false})
    createdAt: Date;
    
    @ManyToOne(() => Gyms, gym => gym.users)
    @JoinColumn()
    gym: Gyms

    @OneToMany(() => Orders, order => order.user)
    @JoinColumn()
    orders: Orders[]
}
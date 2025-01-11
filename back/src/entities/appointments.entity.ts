import { statusAppointment } from "src/enums/statusAppointments.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Classes } from "./class.entity";
import { Users } from "./users.entity";
@Entity({name: 'Appointments'})
export class Appointments {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @Column({ type: "varchar", length: 10, nullable: false, default: statusAppointment.active })
    status: statusAppointment;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "varchar", length: 10, nullable: false })
    time: string;

    @CreateDateColumn({ type: "date", nullable: false})
    createdAt: Date;

    @ManyToOne(() => Users, user => user.appointments, {nullable:false})
    @JoinColumn()
    user: Users

    @ManyToOne(() => Classes, classes => classes.appointments)
    @JoinColumn()
    classes: Classes;
}
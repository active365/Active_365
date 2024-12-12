import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Appointments } from "./appointments.entity";
import { Gyms } from "./gyms.entity";

@Entity({name: 'Classes'})
export class Classes{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 20, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'int', nullable: false })
    capacity: number;

    @Column({ type: 'int', nullable: false })
    duration: number;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "varchar", length: 5, nullable: false })
    time: string;

    @ManyToMany(() => Gyms, gym => gym.classes)
    gym: Gyms[];


    @OneToMany(() => Appointments, appointments => appointments.classes)
    appointments: Appointments[]
}
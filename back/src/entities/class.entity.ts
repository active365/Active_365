import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Appointments } from './appointments.entity';
import { Gyms } from './gyms.entity';

@Entity({ name: 'Classes' })
export class Classes {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ type: 'int', nullable: false })
  duration: number;

  @Column({ type: 'text', nullable: false, default: 'https://plus.unsplash.com/premium_photo-1663047487227-0f3cd88ed8aa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xhc2UlMjBkZSUyMHlvZ2F8ZW58MHx8MHx8fDA%3D' })
  imgUrl: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'time', nullable: false })
  time: string;

  @ManyToOne(() => Gyms, (gym) => gym.classes, { nullable: false })
  @JoinColumn()
  gym: Gyms;

  @OneToMany(() => Appointments, (appointments) => appointments.classes)
  appointments: Appointments[];
}

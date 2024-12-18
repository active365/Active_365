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

  @Column({ type: 'text', nullable: false, default: 'https://example.com/default-image.jpg' })
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

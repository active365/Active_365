import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from 'src/entities/appointments.entity';
import { Classes } from 'src/entities/class.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointments)
        private readonly appointmentsRepository: Repository<Appointments>,
        @InjectRepository(Classes)
        private readonly classesRepository: Repository<Classes>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async createAppointment(userId: string, classId: string): Promise<Appointments> {
        
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }
        
        const gymClass = await this.classesRepository.findOne({
            where: { id: classId },
            relations: ['gym'],
        });
        if (!gymClass) {
            throw new NotFoundException(`Class with ID ${classId} not found.`);
        }
    
        
        const currentAppointments = await this.appointmentsRepository.count({
            where: { classes: gymClass },
        });
        if (currentAppointments >= gymClass.capacity) {
            throw new BadRequestException('No spots available for this class.');
        }
    
        const appointment = this.appointmentsRepository.create({
            user,
            classes: gymClass,
            date: gymClass.date,
            time: gymClass.time,
        });
    
        return this.appointmentsRepository.save(appointment);
    }
}

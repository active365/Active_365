import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from 'src/entities/appointments.entity';
import { Classes } from 'src/entities/class.entity';
import { Users } from 'src/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { isBefore, subHours, parseISO } from 'date-fns';
import { statusAppointment } from 'src/enums/statusAppointments.enum';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AppointmentsService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(Appointments)
        private readonly appointmentsRepository: Repository<Appointments>,
        @InjectRepository(Classes)
        private readonly classesRepository: Repository<Classes>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly emailService: EmailService,
    ) {}

    async createAppointment(userId: string, classId: string): Promise<any> {
        return await this.dataSource.transaction(async (manager) => {
            
            const user = await manager.findOne(Users, { where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found.`);
            }
    
            const gymClass = await manager.findOne(Classes, {
                where: { id: classId },
                relations: ['gym'],
            });
            if (!gymClass) {
                throw new NotFoundException(`Class with ID ${classId} not found.`);
            }

            const currentTime = new Date();
            const dateObject = new Date(gymClass.date);
            const classStartTime = parseISO(`${dateObject.toISOString().split('T')[0]}T${gymClass.time}`);
            const oneHourBeforeClass = subHours(classStartTime, 1);
            if (isBefore(currentTime, oneHourBeforeClass) === false) {
            throw new BadRequestException('Appointments can only be created up to 1 hour before the class.');
            }
    
            const currentAppointments = await manager.count(Appointments, {
                where: { classes: gymClass },
            });
            if (currentAppointments >= gymClass.capacity) {
                throw new BadRequestException('No spots available for this class.');
            }
    
            const appointment = manager.create(Appointments, {
                user,
                userId: user.id,
                classes: gymClass,
                date: gymClass.date,
                time: gymClass.time,
            });
    
            await manager.save(Appointments, appointment);
    
            gymClass.capacity -= 1;  
            await manager.save(Classes, gymClass);

            await this.emailService.sendClassConfirmationEmail(
                user.email,            
                user.name,
                gymClass.name,             
                gymClass.gym.name,     
                dateObject.toISOString().split('T')[0],
                gymClass.time          
            );
    
            return {
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                gymName: gymClass.gym.name,
                className: gymClass.name,
                status: appointment.status,
            };
        });
    }

    async cancelAppointment(appointmentId: string): Promise<any> {
        return await this.dataSource.transaction(async (manager) => {
            
            const appointment = await manager.findOne(Appointments, {
                where: { id: appointmentId },
                relations: ['classes', 'user', 'classes.gym'], 
            });
            if (!appointment) {
                throw new NotFoundException(`Appointment with ID ${appointmentId} not found.`);
            }
            
            if (appointment.status !== statusAppointment.active) {
                throw new BadRequestException(`Cannot cancel an appointment that is ${appointment.status}.`);
            }

            const currentTime = new Date();
            const dateObject = new Date(appointment.date);
            const classStartTime = parseISO(`${dateObject.toISOString().split('T')[0]}T${appointment.time}`);
            const oneHourBeforeClass = subHours(classStartTime, 1);
            if (isBefore(currentTime, oneHourBeforeClass) === false) {
            throw new BadRequestException('Appointments can only be cancelled up to 1 hour before the class.');
            }

            const classDate = new Date(appointment.classes.date);

            appointment.status = statusAppointment.cancelled;
            await manager.save(Appointments, appointment);

            appointment.classes.capacity += 1;
            await manager.save(Classes, appointment.classes);

            await this.emailService.sendAppointmentCancellationEmail(
                appointment.user.email,
                appointment.user.name,
                appointment.classes.name,
                appointment.classes.gym.name,
                classDate.toISOString().split('T')[0],
                appointment.classes.time,
            );

            return {
                message: 'Appointment cancelled successfully.',
                appointmentId: appointment.id,
                className: appointment.classes.name,
                status: appointment.status,
            };
        });
    }

    async modifyAppointment(appointmentId: string, newClassId: string): Promise<any> {
        return await this.dataSource.transaction(async (manager) => {
            
            const appointment = await manager.findOne(Appointments, {
                where: { id: appointmentId },
                relations: ['classes', 'user', 'classes.gym'],
            });
            if (!appointment) {
                throw new NotFoundException(`Appointment with ID ${appointmentId} not found.`);
            }

            if (appointment.status !== statusAppointment.active) {
                throw new BadRequestException(`Cannot modify an appointment that is ${appointment.status}.`); 
            }
    
            if (appointment.classes.id === newClassId) {
                throw new BadRequestException('The new class must be different from the current class.');
            }
    
            const newClass = await manager.findOne(Classes, {
                where: { id: newClassId },
                relations: ['gym'],
            });
            if (!newClass) {
                throw new NotFoundException(`Class with ID ${newClassId} not found.`);
            }
    
            const currentAppointments = await manager.count(Appointments, {
                where: { classes: newClass },
            });
            if (currentAppointments >= newClass.capacity) {
                throw new BadRequestException('No spots available for the new class.');
            }
    
            const currentTime = new Date();
            const dateObject = new Date(appointment.date);
            const classStartTime = parseISO(`${dateObject.toISOString().split('T')[0]}T${appointment.time}`);
            const oneHourBeforeClass = subHours(classStartTime, 1);
            if (isBefore(currentTime, oneHourBeforeClass) === false) {
            throw new BadRequestException('Appointments can only be modified up to 1 hour before the class.');
            }
    
            appointment.classes.capacity += 1;
            await manager.save(Classes, appointment.classes);
    
            newClass.capacity -= 1;
            await manager.save(Classes, newClass);

            const previousClass = appointment.classes;
            const previousClassDate = new Date(previousClass.date);

            appointment.classes = newClass;
            appointment.date = newClass.date;
            appointment.time = newClass.time;
            appointment.status = statusAppointment.active;
            await manager.save(Appointments, appointment);

            const newClassDate = new Date(newClass.date);

            await this.emailService.sendClassModificationEmail(
                appointment.user.email,
                appointment.user.name,
                previousClass.name,
                previousClass.gym.name,
                previousClassDate.toISOString().split('T')[0],
                previousClass.time,
                newClass.name,
                newClass.gym.name,
                newClassDate.toISOString().split('T')[0],
                newClass.time,
            );
    
            return {
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                gymName: newClass.gym.name,
                className: newClass.name,
                status: appointment.status,
            };
        });
    }
    
}

import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from 'src/entities/appointments.entity';
import { Classes } from 'src/entities/class.entity';
import { Users } from 'src/entities/users.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointments, Classes, Users]),
    EmailModule 
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

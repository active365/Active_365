import { Controller, Param, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointments } from 'src/entities/appointments.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post(':userId/:classId')
  async createAppointment(
    @Param('userId') userId: string,
    @Param('classId') classId: string,
  ): Promise<Appointments> {
    return this.appointmentsService.createAppointment(userId, classId);
  }
}

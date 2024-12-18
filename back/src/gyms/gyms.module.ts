import { Module, OnModuleInit } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gyms } from 'src/entities/gyms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gyms])
  ],
  controllers: [GymsController],
  providers: [GymsService],
})
export class GymsModule implements OnModuleInit{
  constructor(private readonly gymsService: GymsService) {}

  async onModuleInit() {
    await this.gymsService.addGyms();
  }
}

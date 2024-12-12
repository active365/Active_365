import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { CreateGymDto } from '../dto/create-gym.dto';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get('seeder')
  addGyms() {
    return this.gymsService.addGyms()
  }

  @Get()
  findAll() {
    return this.gymsService.getGyms();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.gymsService.getById(id);
  }

  @Get(':id')
  findByClass(@Param('class') Class: string) {
    return this.gymsService.getByClass(Class);
  }

  @Put(':id')
    updateGym(@Param('id', ParseUUIDPipe) id:string, @Body() gym: CreateGymDto){
        return this.gymsService.updateGym(id, gym)
    }
}

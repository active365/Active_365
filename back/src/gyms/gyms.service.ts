import { Injectable } from '@nestjs/common';
import { CreateGymDto } from '../dto/create-gym.dto';
import { UpdateGymDto } from '../dto/update-gym.dto';

@Injectable()
export class GymsService {

  getGyms() {
    return `This action returns all gyms`;
  }

  getById(id: number) {
    return `This action returns a #${id} gym`;
  }

  getByClass(Class: string) {
    return `This action updates a #${Class} gym`;
  }

}

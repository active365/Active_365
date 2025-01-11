import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gyms } from 'src/entities/gyms.entity';
import { Repository } from 'typeorm';
import * as data from '../seeders/gyms.json'
import * as bcrypt from 'bcrypt'


@Injectable()
export class GymsService {
  
  constructor(
    @InjectRepository(Gyms)
    private gymsRepository: Repository<Gyms>
  ) {}

  async addGyms() {
    for (const gym of data.gyms) {
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(gym.password, saltRounds);
      
      const newGym = new Gyms();
      newGym.name = gym.name;
      newGym.email= gym.email;
      newGym.password = hashedPassword;
      newGym.phone = gym.phone;
      newGym.address = gym.address;
      newGym.city = gym.city;
      newGym.latitude = gym.latitude;
      newGym.longitude = gym.longitude;

      await this.gymsRepository
      .createQueryBuilder()
      .insert()
      .into(Gyms)
      .values(newGym)
      .orUpdate(['password', 'phone', 'address', 'city', 'name', 'latitude', 'longitude'], ['email'])
      .execute()
    };
    return `The Gyms have been added`
  }
  
  async getGyms() {
    const gyms = await this.gymsRepository.find({
      relations: ['users', 'classes'],
      select: ['id', 'name', 'email', 'phone' ,'address', 'city', 'latitude', 'longitude', 'rol', 'createdAt', 'users'],
    });
    if(gyms.length === 0) {
      throw new NotFoundException('No gyms registered in the database were found');
    };
    return gyms;
  }
  
  async getById(id: string) {
    const gymFound = await this.gymsRepository.findOne({
      where: { id: id },
      relations: ['users', 'classes'],
      select: ['id', 'name', 'email', 'phone' ,'address', 'city', 'latitude', 'longitude', 'rol', 'createdAt'],
  });
  if (!gymFound) {
      throw new NotFoundException(`Gym with ID ${id} not found.`);
  }
  return gymFound;
  }
  
  async getByClass(classId: string) {
    const gyms = await this.gymsRepository.find({
      relations: ['classes'],
      where: {
        classes: {id: classId},
      },
      select: ['id', 'name', 'email', 'phone', 'address', 'classes']
    });

    if (!gyms || gyms.length === 0) {
      throw new NotFoundException(`No gyms found for the class with ID ${classId}.`);
    }

    return gyms.map(gym => ({
      ...gym,
      classes: gym.classes.map(clss => ({
          id: clss.id,
          name: clss.name
      }))
  }));
  }

  async updateGym(id: string, gym: Partial<Gyms>) {
    const gymUpdate = await this.gymsRepository.findOneBy({id});
    if(!gymUpdate) {
      throw new NotFoundException(`Gym with ID ${id} not found.`);
    }
    Object.assign(gymUpdate, gym);
    await this.gymsRepository.save(gymUpdate)
    return {
      message: `Gym with ID ${id} has been succesfully modified`
    }
  }

}

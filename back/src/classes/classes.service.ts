import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto } from 'src/dto/create-class.dto';
import { Classes } from 'src/entities/class.entity';
import { Gyms } from 'src/entities/gyms.entity';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { DataSource, Repository } from 'typeorm';
import * as data from 'src/seeders/classes.json';

@Injectable()
export class ClassesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,
    @InjectRepository(Gyms)
    private gymsRepository: Repository<Gyms>,
    private filesUploadService: FilesUploadService,
  ) {}

  async classesSeeder() {
    const gyms = await this.gymsRepository.find();

    for (const element of data.classes) {
      const gymData = gyms.find((gym) => gym.name === element.gym);
      if (!gymData) {
        throw new NotFoundException(`Gym with name ${element.gym} not found`);
      }
      else {
        const newClass = new Classes();
        newClass.name = element.name;
        newClass.description = element.description;
        newClass.capacity = element.capacity;
        newClass.duration = element.duration;
        newClass.date = new Date (element.date);
        newClass.time = element.time;
        newClass.gym = gymData;
        await this.classesRepository.save(newClass);
      }
    }
    return 'Classes added';
  }

  async getClasses() {
    const classes = await this.classesRepository.find({
      relations: ['gym'],
      select: {
        gym: {
          name: true,
        },
      },
    });
    return classes;
  }

  async getClassesById(id: string) {
    const classes = await this.classesRepository.findOne({
      where: { id },
      relations: ['gym'],
      select: {
        gym: {
          name: true,
        },
      },
    });
    if (!classes) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return classes;
  }

  async getClassesByGymId(gymId: string) {
    const classes = await this.classesRepository.find({
      relations: ['gym'],
      where: { gym: { id: gymId } },
      select: {
        gym: {
          name: true,
        },
      },
    });
    if (classes.length === 0) {
      throw new NotFoundException(`Classes for gym with id ${gymId} not found`);
    }
    return classes;
  }

  async getClassesByGymName(name: string) {
    const classes = await this.classesRepository.find({
      relations: ['gym'],
      where: { gym: { name } },
      select: {
        gym: {
          name: true,
        },
      },
    });
    if (classes.length === 0) {
      throw new NotFoundException(`Classes for gym ${name} not found`);
    }
    return classes;
  }

  async addClasses(
    name: string,
    description: string,
    capacity: number,
    duration: number,
    date: Date,
    time: string,
    gymId: string,
    file?: Express.Multer.File,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const gym = await manager.findOne(Gyms, { where: { id: gymId } });
      if (!gym) {
        throw new NotFoundException(`Gym with id ${gymId} not found`);
      }

      let imgUrl: string | undefined;
      if (file) {
        const uploadImage = await this.filesUploadService.uploadImage(file);
        imgUrl = uploadImage.secure_url;
      }

      const newClass = manager.create(Classes, {
        name,
        description,
        capacity,
        duration,
        date,
        time,
        gym,
        ...(imgUrl && { imgUrl }),
      });

      await manager.save(newClass);
      return `Class ${name} added successfully`;
    });
  }

  async updateClasses(
    id: string,
    classes?: Partial<CreateClassDto>,
    file?: Express.Multer.File,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const classToUpdate = await manager.findOneBy(Classes, { id });
      if (!classToUpdate) {
        throw new NotFoundException(`Class with id ${id} not found`);
      }

      const updateData: Partial<Classes> = { ...classes };

      if (file) {
        const uploadImage = await this.filesUploadService.uploadImage(file);
        updateData.imgUrl = uploadImage.secure_url;
      } else if (!file && !updateData.imgUrl) {
        updateData.imgUrl = classToUpdate.imgUrl;
      }

      if (Object.keys(updateData).length > 0) {
        await manager.update(Classes, { id }, updateData);
      }

      const updatedClass = await manager.findOneBy(Classes, { id });
      return updatedClass;
    });
  }
}

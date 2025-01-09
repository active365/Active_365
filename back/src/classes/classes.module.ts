import { Module, OnModuleInit } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from 'src/entities/class.entity';
import { Gyms } from 'src/entities/gyms.entity';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';

@Module({
  imports:[TypeOrmModule.forFeature([Classes, Gyms]), FilesUploadModule],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule implements OnModuleInit{
  constructor(private readonly classesService: ClassesService) {}

  async onModuleInit() {
    await this.classesService.classesSeeder();
  }
}

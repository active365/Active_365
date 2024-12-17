import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from 'src/dto/create-class.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagesPipe } from 'src/files-upload/file-validation.pipe';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  getClasses() {
    return this.classesService.getClasses();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  addClasses(
    @Body() classes: CreateClassDto,
    @UploadedFile(ValidateImagesPipe) file?: Express.Multer.File,
  ) {
    const { name, description, capacity, duration, date, gymId } = classes;
    return this.classesService.addClasses(name,description,capacity,duration,date,gymId, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateClasses(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() classes: Partial<CreateClassDto>,
    @UploadedFile(ValidateImagesPipe) file?: Express.Multer.File,
  ){
    return this.classesService.updateClasses(id, classes, file);
  }




}

import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateImagesPipe implements PipeTransform {
  transform(file: Express.Multer.File | undefined) {
    
    if (!file) {
      return undefined;
    }

    const maxSizeValidator = new MaxFileSizeValidator({
      maxSize: 800000, 
    });

    if (!maxSizeValidator.isValid(file)) {
      throw new BadRequestException('File size must not exceed 800 KB');
    }

    const fileTypeValidator = new FileTypeValidator({
      fileType: /(jpeg|png|gif|bmp|webp|svg\+xml)$/, 
    });

    if (!fileTypeValidator.isValid(file)) {
      throw new BadRequestException('File format not allowed');
    }

    return file; 
  }
}

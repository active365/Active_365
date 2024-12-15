import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { CloudinaryConfig } from 'src/config/cloudinary';


@Module({
  
  providers: [FilesUploadService, CloudinaryConfig],
  exports: [FilesUploadService]
})
export class FilesUploadModule {}

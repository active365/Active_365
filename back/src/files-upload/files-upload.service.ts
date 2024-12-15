import { Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import toStream = require('buffer-to-stream');

@Injectable()
export class FilesUploadService {

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
            return new Promise((resolve, reject) => {
                const upload = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    },
                );
                toStream(file.buffer).pipe(upload);
            });
        }
}

import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

export function ValidateImages() {
    return new ParseFilePipe({
        validators: [
        new MaxFileSizeValidator({ maxSize: 200000 }), // Tamaño máximo
        new FileTypeValidator({ fileType: /(jpeg|png|gif|bmp|webp|svg\+xml)$/ }), // Tipos de archivo
        ],
    });
}
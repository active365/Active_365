import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateImagesPipe implements PipeTransform {
  transform(file: Express.Multer.File | undefined) {
    // Si no se proporciona un archivo, se permite continuar (opcionalidad)
    if (!file) {
      return undefined;
    }

    // Validar el tamaño máximo
    const maxSizeValidator = new MaxFileSizeValidator({
      maxSize: 200000, // Tamaño máximo: 200 KB
    });

    if (!maxSizeValidator.isValid(file)) {
      throw new BadRequestException('File size must not exceed 200 KB');
    }

    // Validar el tipo de archivo
    const fileTypeValidator = new FileTypeValidator({
      fileType: /(jpeg|png|gif|bmp|webp|svg\+xml)$/, // Tipos permitidos
    });

    if (!fileTypeValidator.isValid(file)) {
      throw new BadRequestException('File format not allowed');
    }

    return file; // Retorna el archivo si pasa las validaciones
  }
}



// export function ValidateImages() {
    // return new ParseFilePipe({
    //     validators: [
    //         new MaxFileSizeValidator({
    //             maxSize: 200000,
    //             message: `El tamaño del archivo no debe superar los 200 KB`
    //         }),
    //             new FileTypeValidator({
    //             fileType: /(jpeg|png|gif|bmp|webp|svg\+xml)$/
    //         })
    //     ],
    // });
    
// }
import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImages } from 'src/files-upload/file-validation.constans';



@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id:string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createProduct(
    @Body() product: CreateProductDto,
    @UploadedFile(ValidateImages()) file: Express.Multer.File,
  ){
    return this.productsService.createProduct(product, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateProduct(
    @Param('id', ParseUUIDPipe) id:string, 
    @Body() product: Partial<Products>,
    @UploadedFile(ValidateImages()) file: Express.Multer.File
  ){
    return this.productsService.updateProduct(id, product, file)
  }
}

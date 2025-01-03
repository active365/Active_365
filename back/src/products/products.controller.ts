import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Put, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagesPipe } from 'src/files-upload/file-validation.pipe';



@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('category') category?: string,
    @Query('subcategory') subcategory?: string,
    @Query('search') search?: string,
  ) {
    const filterDto = { category, subcategory, search };
    return this.productsService.getProducts(filterDto);
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id:string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createProduct(
    @Body() product: Partial<CreateProductDto>,
    @UploadedFile(ValidateImagesPipe) file?: Express.Multer.File,
  ){
    return this.productsService.createProduct(product, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateProduct(
    @Param('id', ParseUUIDPipe) id:string, 
    @Body() product: Partial<Products>,
    @UploadedFile(ValidateImagesPipe) file?: Express.Multer.File
  ){
    return this.productsService.updateProduct(id, product, file)
  }

  @Get('category/:categoryId')
  getProductsByCategory(@Param('categoryId') categoryId: string) {
  return this.productsService.getProductsByCategory(categoryId);
}
}

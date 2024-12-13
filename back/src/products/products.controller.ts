import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';
import { CreateProductDto } from 'src/dto/createProduct.dto';


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
  createProduct(@Body() product: CreateProductDto){
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id', ParseUUIDPipe) id:string, @Body() product: Partial<Products>){
    return this.productsService.updateProduct(id, product)
  }
}

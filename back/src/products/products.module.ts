import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories]),
    TypeOrmModule.forFeature([Products]),
    FilesUploadModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit{
  constructor(private readonly productsService: ProductsService) {}

  async onModuleInit() {
    await this.productsService.addProducts();
  }
}

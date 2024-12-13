import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products) 
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>
) {}
  
  async getProducts() {
    const products = await this.productsRepository.find();

        if(products.length === 0) {
            throw new NotFoundException('No se encontraron productos en la base de datos.');
        }
        return products;
  }

  async getProductById(id: string) {
        
    const product = await this.productsRepository.findOne({
        where: { id: id }
    });
    if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return product
  }
  
  async createProduct(product: any) {
    const categoryFound = await this.categoriesRepository.findOne({
      where: { name: product.category }
    });
    if (!categoryFound) {
      throw new NotFoundException(`Category with name "${product.category}" not found.`);
    }

    const newProduct = this.productsRepository.create({
      ...product,
      category: categoryFound
    });
    return await this.productsRepository.save(newProduct);
  }

  async updateProduct(id: string, product: Partial<Products>) {
    const productUpdate = await this.productsRepository.findOneBy({ id });
    if (!productUpdate) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    Object.assign(productUpdate, product);
    return await this.productsRepository.save(productUpdate);
  }
  
}

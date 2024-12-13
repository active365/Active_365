import { Injectable, NotFoundException } from '@nestjs/common';
import * as data from "../seeders/products.json"
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/dto/createProduct.dto';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products) 
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>
) {}

async addProducts() {
  const categories = await this.categoriesRepository.find();

  data?.map(async (element) => {
      const category = categories.find(
          (category) => category.name === element.category,
      )
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.category = category;

      await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(product)
      .orUpdate(['description', 'price', 'stock'], ['name'])
      .execute()
  });
  return "Products added"

}
  
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
  
  async createProduct(product: CreateProductDto) {
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

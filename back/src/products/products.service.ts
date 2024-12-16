import { Injectable, NotFoundException } from '@nestjs/common';
import * as data from "../seeders/products.json"
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { FilesUploadService } from 'src/files-upload/files-upload.service';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products) 
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    private readonly filesUploadService: FilesUploadService,
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
        product.imgUrl = element.imgUrl;
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
    const products = await this.productsRepository.find({
      relations: ['category'],
      select: ['id', 'name', 'description', 'price', 'stock', 'imgUrl', 'category']
    });

        if(products.length === 0) {
            throw new NotFoundException('No products were found in the database.');
        }
        return products;
  }

  async getProductById(id: string) {
        
    const product = await this.productsRepository.findOne({
        where: { id: id },
        relations: ['category'],
        select: ['id', 'name', 'description', 'price', 'stock', 'imgUrl', 'category']
    });
    if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found..`);
    }
    return product
  }
  
  async createProduct(product:any, file: Express.Multer.File) {
    const categoryFound = await this.categoriesRepository.findOne({
      where: { name: product.category }
    });
    if (!categoryFound) {
      throw new NotFoundException(`Category with name "${product.category}" not found.`);
    }

    let image: string = 'https://example.com/default-image.jpg';
    if (file) {
      const uploadImage = await this.filesUploadService.uploadImage(file);
      image = uploadImage.secure_url;
    }

    const newProduct = this.productsRepository.create({
      ...product,
      category: categoryFound,
      imgUrl: image
    });
    return await this.productsRepository.save(newProduct);
  }

  async updateProduct(id: string, product: any, file?:Express.Multer.File) {
    const productUpdate = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'] 
    });
    if (!productUpdate) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    if (product.category) {
    const categoryFound = await this.categoriesRepository.findOne({
      where: { name: product.category },
    });
    if (!categoryFound) {
      throw new NotFoundException(`Category with name "${product.category}" not found.`);
    }
    productUpdate.category = categoryFound;
    }

    if (file) {
      const uploadImage = await this.filesUploadService.uploadImage(file);
      productUpdate.imgUrl = uploadImage.secure_url;
    }

    Object.assign(productUpdate, { ...product, category: productUpdate.category });
    return await this.productsRepository.save(productUpdate);
  }

}

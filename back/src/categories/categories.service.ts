import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from "../seeders/products.json"

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories) 
        private categoriesRepository: Repository<Categories>
    ) {}
    
    async addCategories() {
        
        data.map(async (product) => {
            await this.categoriesRepository
            .createQueryBuilder()
            .insert()
            .into(Categories)
            .values({name: product.category})
            .onConflict(`("name") DO NOTHING`)
            .execute()
        })
        return `Se han añadido las categorías`
    }

    async getCategories() {
        const categories = await this.categoriesRepository.find();
        if(categories.length === 0) {
            throw new NotFoundException('No categories were found in the database.');
        }
        return categories;
    }
}

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>
    ){}

    async createOrder(userId: string, products: any) {

        return await this.dataSource.transaction(async (manager) => {
            const user = await manager.findOne(Users, { where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`User with id ${userId} not found`);
            }
    
            const order = new Orders();
            order.date = new Date();
            order.user = user;
            const newOrder = await manager.save(order);
    
            let total = 0;
            const productsArray = [];
    
            for (const element of products) {
                const product = await manager.findOne(Products, { where: { id: element.id } });
                if (!product || product.stock < element.quantity) {
                    throw new BadRequestException(`Product with id ${element.id} is unavailable`);
                }
    
                total += Number(product.price) * element.quantity;
                await manager.update(Products, product.id, { stock: product.stock - element.quantity });
                productsArray.push(product);
            }
    
            const orderDetail = new OrderDetails();
            orderDetail.price = Number(total.toFixed(2));
            orderDetail.product = productsArray;
            orderDetail.order = newOrder;
            await manager.save(orderDetail);
    
            newOrder.orderdetails = orderDetail;
            return manager.findOne(Orders, {
                where: { id: newOrder.id },
                relations: ['orderDetails']
            });
        });
    }

    async getOrder(id: string){
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: ['orderDetails']
        });
        if (!order) {
            throw new NotFoundException (`Order with id ${id} was not found`);
        }
        return order;
    }
    
}

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrderDto } from 'src/dto/product-order.dto';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { OrderProduct } from 'src/entities/orderProduct.entity';
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

    async createOrder(userId: string, products: ProductOrderDto[]) {
        return await this.dataSource.transaction(async (manager) => {
            const user = await manager.findOne(Users, { where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`User with id ${userId} not found`);
            }
    
            const order = new Orders();
            order.date = new Date();
            order.user = user;
            const newOrder = await manager.save(order);

            const orderDetails = new OrderDetails();
            orderDetails.order = newOrder;

            let totalPrice = 0;
            const OrderProducts = [];

            for (const { productId, quantity } of products) {
                const product = await manager.findOne(Products, { where: { id: productId } });
                if (!product || product.stock < quantity) {
                    throw new NotFoundException(`Product with id ${productId} is unavailable`);
                }
                const orderProduct = new OrderProduct();
                orderProduct.product = product;
                orderProduct.quantity = quantity;
                orderProduct.orderDetails = orderDetails;
                orderProduct.price = Number(product.price) * quantity;
                totalPrice += orderProduct.price;

                product.stock -= quantity;
                await manager.save(product);
                OrderProducts.push(orderProduct);
            }
            orderDetails.totalPrice = totalPrice;
            orderDetails.orderProducts = OrderProducts;
            await manager.save(orderDetails);

            newOrder.orderDetails = orderDetails;
            await manager.save(newOrder);
           return manager.findOne(Orders, { where: { id: newOrder.id }, relations: ['orderDetails'] });
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

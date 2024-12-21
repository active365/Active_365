import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getCheckoutSession(orderId: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   const order = await this.ordersRepository.findOne({
    where: { id: orderId },
    relations: ['orderDetails', 'orderDetails.orderProducts', 'orderDetails.orderProducts.product'],
   })
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const lineItems = order.orderDetails.orderProducts.map((orderProduct) => ({
      price_data:{
        currency: 'usd',
        product_data: {
          name: orderProduct.product.name,
        },
        unit_amount: orderProduct.product.price * 100,
      },
      quantity: orderProduct.quantity,
    }));
    
    return await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancelled`,
    });
  }

  async successCheckout() {
    return 'Purchase successful';
  }
  async cancelCheckout() {  
    return 'Purchase cancelled';
  } 
}

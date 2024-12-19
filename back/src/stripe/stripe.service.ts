import { Injectable } from '@nestjs/common';
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
  async getCheckoutSession() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    return await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Laptop',
            },
            currency: 'usd',
            unit_amount: 10 * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: 'Cellphone',
            },
            currency: 'usd',
            unit_amount: 20 * 100,
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}`
    });
  }
}

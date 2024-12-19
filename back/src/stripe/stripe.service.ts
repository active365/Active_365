import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StripeService {
    constructor(
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ){}
    async getCheckoutSession(id: string, orderId: string) {
        const user = await this.usersRepository.findOneBy({id: id});
        const userEmail = user.email;

        const order = await this.ordersRepository.findOneBy({id: orderId});

        const stripe = require(`stripe`)(process.env.STRIPE_SECRET_KEY);

        stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            customer_email: userEmail,
            client_reference_id: orderId,
        });
         
    }
}
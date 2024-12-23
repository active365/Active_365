import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails, Orders, Users])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}

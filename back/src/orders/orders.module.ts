import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Orders } from 'src/entities/orders.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Users } from 'src/entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products,Orders,OrderDetails,Users])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrder(@Param('id', ParseUUIDPipe) id:string){
    return this.ordersService.getOrder(id);
  }

  @Post()
    createOrder(@Body() order: CreateOrderDto) {
    const {userId, products} = order;
    return this.ordersService.createOrder(userId, products)
  }
}

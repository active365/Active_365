import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('checkout')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('/success')
  async successCheckout() {
    return this.stripeService.successCheckout();
  }

  @Get('/cancelled')
  async cancelCheckout() {
    return this.stripeService.cancelCheckout();
  }

  @Get('/:orderId')
  async getCheckoutSession(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.stripeService.getCheckoutSession(orderId);
  }
}

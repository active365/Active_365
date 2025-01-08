import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
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

  @Post('/:orderId')
  async getCheckoutSession(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.stripeService.getCheckoutSession(orderId);
  }

  @Get('/status/:sessionId')
  async sessionStatus(@Param('sessionId') sessionId: string) {
    return this.stripeService.sessionStatus(sessionId);
  }
}

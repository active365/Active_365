import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async getCheckoutSession() {
    return this.stripeService.getCheckoutSession();
  }
}

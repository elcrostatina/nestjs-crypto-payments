import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramStarsService } from '../../lib/services/telegram-stars/telegram-stars.service';

@Controller()
export class AppController {
  constructor(private readonly telegramStarsService: TelegramStarsService) {
    this.telegramStarsService.getPreCheckoutObservable().subscribe((data) => {
      console.log({ preCheckout: data });
    });
    this.telegramStarsService.getCheckoutObservable().subscribe((data) => {
      console.log({ complete: data });
    });
  }

  @Get()
  async getHello(): Promise<any> {
    return this.telegramStarsService.createPayment({
      orderId: '123',
      title: 'Test',
      description: 'Test',
      prices: [{ label: 'Test', amount: 1 }],
    });
  }
}

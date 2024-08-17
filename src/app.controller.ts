import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramStarsService } from '@app/crypto-payments/services/telegram-stars/telegram-stars.service';

@Controller()
export class AppController {
  constructor(private readonly telegramStarsService: TelegramStarsService) {}

  @Get()
  async getHello(): Promise<any> {
    console.log('telegramStarsService', this.telegramStarsService);
    return this.telegramStarsService.createPayment({
      orderId: '123',
      title: 'Test',
      description: 'Test',
      prices: [{ label: 'Test', amount: 100 }],
    });
  }
}

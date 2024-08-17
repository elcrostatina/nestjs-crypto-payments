import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramStarsService } from '@app/crypto-payments/telegram-stars/telegram-stars.service';

@Controller()
export class AppController {
  constructor(private readonly telegramStarsService: TelegramStarsService) {}

  @Get()
  getHello(): void {
    this.telegramStarsService.createPayment({} as any);
  }
}

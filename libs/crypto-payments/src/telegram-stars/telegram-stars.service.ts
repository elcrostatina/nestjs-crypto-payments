import { PaymentService } from '@app/crypto-payments/interfaces/payment-service.interface';
import {
  GetPaymentStatusResponse,
  TelegramBotCreatePaymentParams,
  TelegramBotCreatePaymentResponse,
} from '@app/crypto-payments/types/payment-utilities.type';
import { TelegramBotProvider } from '@app/crypto-payments/providers/telegram-bot.provider';
import { v4 as uuidv4 } from 'uuid';
import { PaymentStatus } from '@app/crypto-payments/enum/payment-status.enum';

export class TelegramStarsService implements PaymentService {
  constructor(private readonly telegramBotProvider: TelegramBotProvider) {}

  public async createPayment(
    params: TelegramBotCreatePaymentParams,
  ): Promise<TelegramBotCreatePaymentResponse> {
    const payload = {
      intentId: uuidv4(),
      orderId: params.orderId,
    };

    const invoiceLink = await this.telegramBotProvider
      .getBot()
      .api.createInvoiceLink(
        params.title,
        params.description,
        JSON.stringify(payload),
        '',
        'XTR',
        params.prices,
      );

    return {
      intentId: payload.intentId,
      status: PaymentStatus.Checking,
      invoiceLink,
    };
  }

  getPaymentStatus(intendId: string): Promise<GetPaymentStatusResponse> {
    return Promise.resolve(undefined);
  }
}

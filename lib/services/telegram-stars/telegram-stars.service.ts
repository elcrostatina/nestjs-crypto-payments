import {
  TelegramPreCheckoutQuery,
  TelegramBotCreatePaymentParams,
  TelegramBotCreatePaymentResponse,
  TelegramCheckoutQuery,
} from '../../interfaces/payment-utilities.interface';
import { v4 as uuidv4 } from 'uuid';
import { OnModuleInit } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import { PaymentService } from '../../interfaces/payment-service.interface';
import { TelegramBotProvider } from '../../providers/telegram-bot.provider';
import { TelegramStarsMapper } from '../../mappers/telegram-stars.mapper';
import { PaymentStatus } from '../../enum/payment-status.enum';

export class TelegramStarsService
  implements PaymentService<TelegramBotCreatePaymentParams>, OnModuleInit
{
  private preCheckoutObservable = new Observable<TelegramPreCheckoutQuery>(
    (subscriber) => this.createPreCheckoutQueryObservable(subscriber),
  );

  private checkoutObservable = new Observable<TelegramCheckoutQuery>(
    (subscriber) => this.createCheckoutQueryObservable(subscriber),
  );

  constructor(
    private readonly telegramBotProvider: TelegramBotProvider,
    private readonly telegramStarsMapper: TelegramStarsMapper,
  ) {}

  public onModuleInit(): void {
    this.handleBotMessages();
  }

  public handleBotMessages(): void {
    this.telegramBotProvider.getBot().start();

    // subscribe to pre_checkout_query to return to execute answerPreCheckoutQuery(true)
    this.preCheckoutObservable.subscribe();
  }

  private createPreCheckoutQueryObservable(
    subscriber: Subscriber<TelegramPreCheckoutQuery>,
  ): void {
    this.telegramBotProvider.getBot().on('pre_checkout_query', (ctx) => {
      subscriber.next(this.telegramStarsMapper.mapPreCheckoutQuery(ctx));

      ctx
        .answerPreCheckoutQuery(true)
        .catch(() =>
          subscriber.error({ message: 'pre_checkout_query failed', ctx }),
        );
    });
  }

  private createCheckoutQueryObservable(
    subscriber: Subscriber<TelegramCheckoutQuery>,
  ): void {
    this.telegramBotProvider
      .getBot()
      .on('message:successful_payment', (ctx) => {
        if (!ctx.message?.successful_payment) {
          return;
        }

        subscriber.next(this.telegramStarsMapper.mapCheckoutQuery(ctx));
      });
  }

  public getPreCheckoutObservable(): Observable<any> {
    return this.preCheckoutObservable;
  }

  public getCheckoutObservable(): Observable<TelegramCheckoutQuery> {
    return this.checkoutObservable;
  }

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
}

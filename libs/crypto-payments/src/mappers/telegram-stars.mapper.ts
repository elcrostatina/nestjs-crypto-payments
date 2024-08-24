import {
  TelegramCheckoutQuery,
  TelegramCheckoutQueryFrom,
  TelegramPreCheckoutQuery,
} from '@app/crypto-payments/interfaces/payment-utilities.interface';
import { PaymentStatus } from '@app/crypto-payments/enum/payment-status.enum';

export class TelegramStarsMapper {
  public mapPreCheckoutQuery(ctx): TelegramPreCheckoutQuery {
    const invoice: { intentId: string; orderId: string } = JSON.parse(
      ctx.update.pre_checkout_query.invoice_payload,
    );

    return {
      id: ctx.update.pre_checkout_query.id,
      totalAmount: ctx.update.pre_checkout_query.total_amount,
      intentId: invoice.intentId,
      orderId: invoice.orderId,
      from: this.mapFromObject(ctx.update.pre_checkout_query.from),
    };
  }

  public mapCheckoutQuery(ctx): TelegramCheckoutQuery {
    const invoice: { intentId: string; orderId: string } = JSON.parse(
      ctx.update.message.successful_payment.invoice_payload,
    );

    return {
      totalAmount: ctx.update.message.successful_payment.total_amount,
      intentId: invoice.intentId,
      orderId: invoice.orderId,
      telegramPaymentChargeId:
        ctx.update.message.successful_payment.telegram_payment_charge_id,
      providerPaymentChargeId:
        ctx.update.message.successful_payment.provider_payment_charge_id,
      from: this.mapFromObject(ctx.update.message.from),
      status: PaymentStatus.Paid,
    };
  }

  private mapFromObject(from): TelegramCheckoutQueryFrom {
    return {
      id: from.id,
      isBot: from.is_bot,
      firstName: from.first_name,
      lastName: from.last_name,
      username: from.username,
    };
  }
}

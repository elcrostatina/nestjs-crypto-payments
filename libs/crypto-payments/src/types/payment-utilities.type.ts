import { PaymentStatus } from '@app/crypto-payments/enum/payment-status.enum';
import type { LabeledPrice } from 'grammy/out/types';

export type CreatePaymentResponse = {
  intentId?: string;
  status: PaymentStatus;
  message?: string;
};

export type GetPaymentStatusResponse = Pick<CreatePaymentResponse, 'status'>;

export type CreatePaymentParams = {
  amount: number;
  currency: string;
  toCurrency: string;
  orderId: string;
};

export type TelegramBotCreatePaymentParams = CreatePaymentParams & {
  title: string;
  description: string;
  prices: LabeledPrice[];
};

export type TelegramBotCreatePaymentResponse = Required<
  Omit<CreatePaymentResponse, 'message'>
> & { invoiceLink: string };

export type ThirdPartyProviderInfo = {
  host?: string;
  clientId?: string;
  clientSecret: string;
};

import { PaymentStatus } from '@app/crypto-payments/enum/payment-status.enum';
import type { LabeledPrice } from 'grammy/out/types';

export interface CreatePaymentResponse {
  intentId?: string;
  status: PaymentStatus;
  message?: string;
}

export interface CreatePaymentParams {
  amount: number;
  currency: string;
  toCurrency: string;
  orderId: string;
}

export interface TelegramBotCreatePaymentParams
  extends Pick<CreatePaymentParams, 'orderId'> {
  title: string;
  description: string;
  prices: LabeledPrice[];
}

export interface TelegramBotCreatePaymentResponse
  extends Required<Omit<CreatePaymentResponse, 'message'>> {
  invoiceLink: string;
}

export interface ThirdPartyProviderInfo {
  host?: string;
  clientId?: string;
  clientSecret: string;
}

export interface TonStarsProviderInfo {
  botToken: string;
}

export interface TelegramCheckoutQueryFrom {
  id: number;
  isBot: boolean;
  firstName: string;
  lastName?: string;
  username: string;
}

export interface TelegramPreCheckoutQuery {
  id: string;
  totalAmount: number;
  intentId: string;
  orderId: string;
  from: TelegramCheckoutQueryFrom;
}

export interface TelegramCheckoutQuery {
  from: TelegramCheckoutQueryFrom;
  totalAmount: number;
  intentId: string;
  orderId: string;
  telegramPaymentChargeId: string;
  providerPaymentChargeId: string;
  status: PaymentStatus.Paid;
}

import { PaymentStatus } from '@app/crypto-payments/enum/payment-status.enum';

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

export type ThirdPartyProviderInfo = {
  host: string;
  clientId: string;
  clientSecret: string;
};

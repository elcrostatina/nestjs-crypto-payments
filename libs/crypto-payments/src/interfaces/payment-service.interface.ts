import {
  CreatePaymentParams,
  CreatePaymentResponse,
} from '@app/crypto-payments/interfaces/payment-utilities.interface';

export interface PaymentService<T = CreatePaymentParams> {
  createPayment(params: T): Promise<CreatePaymentResponse>;
}

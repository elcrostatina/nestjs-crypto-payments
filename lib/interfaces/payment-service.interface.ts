import {
  CreatePaymentParams,
  CreatePaymentResponse,
} from './payment-utilities.interface';

export interface PaymentService<T = CreatePaymentParams> {
  createPayment(params: T): Promise<CreatePaymentResponse>;
}

import {
  CreatePaymentParams,
  CreatePaymentResponse,
  GetPaymentStatusResponse,
} from '@app/crypto-payments/types/payment-utilities.type';

export interface PaymentService<T = CreatePaymentParams> {
  createPayment(params: T): Promise<CreatePaymentResponse>;
  getPaymentStatus(intendId: string): Promise<GetPaymentStatusResponse>;
}

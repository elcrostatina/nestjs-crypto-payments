import {
  CreatePaymentParams,
  CreatePaymentResponse,
  GetPaymentStatusResponse,
} from '@app/crypto-payments/types/payment-utilities.type';

export interface PaymentService {
  createPayment(params: CreatePaymentParams): Promise<CreatePaymentResponse>;
  getPaymentStatus(intendId: string): Promise<GetPaymentStatusResponse>;
}

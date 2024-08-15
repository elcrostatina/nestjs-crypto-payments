import { PaymentService } from '@app/crypto-payments/interfaces/payment-service.interface';
import {
  CreatePaymentParams,
  CreatePaymentResponse,
  ThirdPartyProviderInfo,
} from '@app/crypto-payments/types/payment-utilities.type';
import { CryptomusResponse } from '@app/crypto-payments/types/third-party-providers.type';
import { HttpHelper } from '@app/crypto-payments/helpers/http.helper';
import { PaymentStatus } from '@app/crypto-payments/enum/payment-status.enum';
import * as assert from 'node:assert';
import { timingSafeEqual } from 'crypto';
import * as crypto from 'crypto';

/**
 * Service for third party payment provider.
 * This class is using cryptomus, and it's only responsible for the creation of payments ton.
 * @see {@link https://doc.cryptomus.com/payments/creating-invoice}
 */
export class ThirdPartyTonService implements PaymentService {
  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly providerInfo: ThirdPartyProviderInfo,
  ) {}

  public async createPayment(
    params: CreatePaymentParams,
  ): Promise<CreatePaymentResponse> {
    const response = await this.httpHelper.post<CryptomusResponse>({
      url: this.providerInfo.host,
      body: {
        ...params,
      },
      headers: {
        sign: this.generateWebhookSignature(params),
        merchantId: this.providerInfo.clientId,
      },
    });

    return this.parseCreatePaymentResponse(response);
  }

  private parseCreatePaymentResponse(
    response: CryptomusResponse,
  ): CreatePaymentResponse {
    assert(
      response.state === 0 || response.state === 1,
      'Invalid response from cryptomus',
    );

    if (response.state === 0) {
      return {
        message: response.message,
        status: PaymentStatus.Failed,
      };
    }

    return {
      intentId: response.result.uuid,
      status: PaymentStatus.Checking,
    };
  }

  public getPaymentStatus(intendId: string): Promise<CreatePaymentResponse> {
    throw new Error('Method not implemented.');
  }

  public validateWebhookSignature(signature: string): boolean {
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(this.providerInfo.clientSecret),
    );
  }

  public generateWebhookSignature(payload): string {
    return crypto
      .createHash('md5')
      .update(
        Buffer.from(JSON.stringify(payload)).toString('base64') +
          this.providerInfo.clientSecret,
      )
      .digest('hex');
  }
}

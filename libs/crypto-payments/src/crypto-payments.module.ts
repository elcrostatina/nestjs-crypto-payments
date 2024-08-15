import { Module, Provider } from '@nestjs/common';
import { ThirdPartyTonService } from '@app/crypto-payments/services/third-party-ton/third-party-ton.service';
import { HttpHelper } from '@app/crypto-payments/helpers/http.helper';
import { ThirdPartyProviderInfo } from '@app/crypto-payments/types/payment-utilities.type';
import { PaymentGateway } from '@app/crypto-payments/enum/payment-gateway.enum';

const createAsyncProviders = (
  options: { type: PaymentGateway; providerInfo: ThirdPartyProviderInfo }[],
): Provider[] => {
  return options.map((option) => ({
    provide: `${option.type}`,
    useFactory: async (httpHelper: HttpHelper) => {
      if (option.type === PaymentGateway.ThirdPartyTon) {
        return new ThirdPartyTonService(httpHelper, option.providerInfo);
      }

      throw new Error(`Invalid payment type "${option.type}"`);
    },
    inject: [HttpHelper],
  }));
};

@Module({})
export class CryptoPaymentsModule {
  static registerAsync(
    options: { type: PaymentGateway; providerInfo: ThirdPartyProviderInfo }[],
  ) {
    const providers = createAsyncProviders(options);
    return {
      module: CryptoPaymentsModule,
      providers: [HttpHelper, ...providers],
      exports: [...providers],
    };
  }
}

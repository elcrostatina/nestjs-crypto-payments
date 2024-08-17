import { Global, Module, Provider } from '@nestjs/common';
import { ThirdPartyTonService } from './services/third-party-ton/third-party-ton.service';
import { HttpHelper } from './helpers/http.helper';
import { ThirdPartyProviderInfo } from './types/payment-utilities.type';
import { PaymentGateway } from './enum/payment-gateway.enum';
import { TelegramStarsService } from './telegram-stars/telegram-stars.service';
import { TelegramBotProvider } from './providers/telegram-bot.provider';

type ProviderOptions = {
  type: PaymentGateway;
  providerInfo: ThirdPartyProviderInfo;
};

type CryptoPaymentsModuleOptions = {
  useFactory: (...args: any[]) => Promise<ProviderOptions[]>;
  inject?: any[];
};

const createProviders = (options: ProviderOptions[]): Provider[] => {
  return options.map((option) => {
    if (option.type === PaymentGateway.ThirdPartyTon) {
      return {
        provide: ThirdPartyTonService,
        useFactory: async (httpHelper: HttpHelper) => {
          return new ThirdPartyTonService(httpHelper, option.providerInfo);
        },
        inject: [HttpHelper],
      };
    }

    if (option.type === PaymentGateway.TelegramStars) {
      return {
        provide: TelegramStarsService,
        useFactory: async () => {
          return new TelegramStarsService(
            new TelegramBotProvider(option.providerInfo.clientSecret),
          );
        },
        inject: [],
      };
    }

    throw new Error(`Invalid payment type "${option.type}"`);
  });
};

@Module({})
export class CryptoPaymentsModule {
  static register(options) {
    const providers = createProviders(options);

    return {
      module: CryptoPaymentsModule,
      providers: [HttpHelper, ...providers],
      exports: providers,
    };
  }
  // static registerAsync(options: CryptoPaymentsModuleOptions) {
  //   const asyncProviders: Provider = {
  //     provide: 'CONFIG_OPTIONS',
  //     useFactory: options.useFactory,
  //     inject: [],
  //   };
  //
  //   return {
  //     module: CryptoPaymentsModule,
  //     providers: [
  //       HttpHelper,
  //       asyncProviders,
  //       {
  //         provide: 'PAYMENT_SERVICES',
  //         useFactory: async (configOptions) => {
  //           return createAsyncProviders(configOptions);
  //         },
  //         inject: ['CONFIG_OPTIONS'],
  //       },
  //     ],
  //     exports: [TelegramStarsService],
  //   };
  // }
}

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpHelper } from './helpers/http.helper';
import {
  ThirdPartyProviderInfo,
  TonStarsProviderInfo,
} from './interfaces/payment-utilities.interface';
import { PaymentGateway } from './enum/payment-gateway.enum';
import { TelegramStarsService } from './services/telegram-stars/telegram-stars.service';
import { TelegramBotProvider } from './providers/telegram-bot.provider';
import { TelegramStarsMapper } from './mappers/telegram-stars.mapper';

type ProviderOptions = {
  type: PaymentGateway;
  providerInfo: ThirdPartyProviderInfo;
};

const CRYPTO_PAYMENTS_MODULE_OPTIONS = 'CRYPTO_PAYMENTS_MODULE_OPTIONS';

@Module({})
export class CryptoPaymentsModule {
  /**
   * Register the module and the providers provided in the options.
   */
  static register(options: ProviderOptions[]) {
    const providers = this.createProviders(options);

    return {
      module: CryptoPaymentsModule,
      providers: [HttpHelper, ...providers],
      exports: providers,
    };
  }

  static registerTonStarsAsync(options): DynamicModule {
    const serviceConfig = {
      provide: CRYPTO_PAYMENTS_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: CryptoPaymentsModule,
      providers: [
        serviceConfig,
        {
          provide: TelegramStarsService,
          useFactory: async (options) =>
            new TelegramStarsService(
              new TelegramBotProvider(options.botToken),
              new TelegramStarsMapper(),
            ),
          inject: [CRYPTO_PAYMENTS_MODULE_OPTIONS],
        },
      ],
      imports: options.imports || [],
      exports: [TelegramStarsService],
    };
  }

  private static createTonStarsInstance(
    options: TonStarsProviderInfo,
  ): TelegramStarsService {
    return new TelegramStarsService(
      new TelegramBotProvider(options.botToken),
      new TelegramStarsMapper(),
    );
  }

  private static createProviders(options: ProviderOptions[]): Provider[] {
    return options.map((option) => {
      if (option.type === PaymentGateway.TelegramStars) {
        return {
          provide: TelegramStarsService,
          useValue: this.createTonStarsInstance({
            botToken: option.providerInfo.clientSecret,
          }),
        };
      }

      throw new Error(`Invalid payment type "${option.type}"`);
    });
  }
}

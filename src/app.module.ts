import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPaymentsModule } from '@app/crypto-payments';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import { PaymentGateway } from '@app/crypto-payments/enum/payment-gateway.enum';
import { TelegramStarsService } from '@app/crypto-payments/telegram-stars/telegram-stars.service';

export const config = () => ({
  telegramBot: process.env.TOKEN_BOT,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: process.env.ENV_FILE,
    }),
    CryptoPaymentsModule.register([
      {
        type: PaymentGateway.TelegramStars,
        providerInfo: {
          clientSecret: '',
        },
      },
    ]),
    // CryptoPaymentsModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => {
    //     return [
    //       {
    //         type: PaymentGateway.TelegramStars,
    //         providerInfo: {
    //           clientSecret: '',
    //         },
    //       },
    //     ];
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

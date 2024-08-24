import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPaymentsModule } from '../../lib';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';

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
    CryptoPaymentsModule.registerTonStarsAsync({
      useFactory: (configService: ConfigService) => {
        return {
          botToken: configService.get('telegramBot'),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

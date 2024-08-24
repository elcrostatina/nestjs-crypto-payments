# NestJS Crypto Payments

`nestjs-crypto-payments` is a NestJS package that allows you to receive payments through cryptocurrencies and Telegram Stars. This package provides an easy-to-use interface for integrating with the TON blockchain and Telegram Stars payments.

## Installation

To install the package, use npm:

```bash
npm i nestjs-crypto-payments
```

# Usage

### Module Setup
Retrieve the Telegram Bot Token from BotFather [https://core.telegram.org/bots/tutorial](https://core.telegram.org/bots/tutorial).


To use the nestjs-crypto-payments package, first, register the module in your NestJS application. You can configure the module using registerTonStarsAsync to set up Telegram Stars payments.

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoPaymentsModule } from 'nestjs-crypto-payments';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
})
export class AppModule {}
```

### Service Integration
In your service, inject the TelegramStarsService to subscribe to payment events such as pre-checkout and checkout.
    
```typescript
import { Injectable } from '@nestjs/common';
import { TelegramStarsService } from 'nestjs-crypto-payments';

@Injectable()
export class PaymentsService {
constructor(private readonly telegramStarsService: TelegramStarsService) {
    this.telegramStarsService.getPreCheckoutObservable().subscribe((data) => {
    console.log({ preCheckout: data });
    });

    this.telegramStarsService.getCheckoutObservable().subscribe((data) => {
      console.log({ complete: data });
    });
  }
}
```

#### Handling Payment Events
- PreCheckout: Handle the event when a user is about to complete the payment.
- Checkout: Handle the event when a payment is successfully completed.


## TODO
- Integrate TON Payments: Add support for receiving payments via the TON blockchain.
- Expose Decorator Usage: Provide an easy-to-use decorator for handling payments in a more declarative manner.
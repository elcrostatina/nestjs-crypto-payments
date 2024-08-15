import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPaymentsModule } from '@app/crypto-payments';
import { PaymentGateway } from '@app/crypto-payments/enum/payment-gateway.enum';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

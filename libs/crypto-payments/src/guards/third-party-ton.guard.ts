import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ThirdPartyTonService } from '@app/crypto-payments/services/third-party-ton/third-party-ton.service';

@Injectable()
export class WebhookGuard implements CanActivate {
  constructor(private readonly thirdPartyTonService: ThirdPartyTonService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const signature = context.switchToHttp().getRequest().body.signature;

    if (!signature) {
      return false;
    }

    return this.thirdPartyTonService.validateWebhookSignature(signature);
  }
}

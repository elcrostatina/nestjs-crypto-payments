import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThirdPartyTonService } from '@app/crypto-payments/services/third-party-ton/third-party-ton.service';

// export const ExtractBody = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) =>
//     ctx.switchToHttp().getRequest().body,
// );

export const PaymentWebhook = (path: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return applyDecorators(Post(path), UseGuards(ThirdPartyTonService))(
      target,
      propertyKey,
      descriptor,
    );
  };
};

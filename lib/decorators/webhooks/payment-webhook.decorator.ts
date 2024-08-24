import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import { WebhookGuard } from '../../guards/third-party-ton.guard';

// export const ExtractBody = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) =>
//     ctx.switchToHttp().getRequest().body,
// );
// todo: implement a third-party service that requires a webhook
export const PaymentWebhook = (path: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return applyDecorators(Post(path), UseGuards(WebhookGuard))(
      target,
      propertyKey,
      descriptor,
    );
  };
};

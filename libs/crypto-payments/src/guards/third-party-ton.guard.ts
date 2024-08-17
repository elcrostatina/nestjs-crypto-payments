import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// @todo: implement webhook guard
@Injectable()
export class WebhookGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const signature = context.switchToHttp().getRequest().body.signature;

    if (!signature) {
      return false;
    }
  }
}

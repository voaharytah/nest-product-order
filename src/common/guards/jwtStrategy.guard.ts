import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtStrategyGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    if (req.url.indexOf('login') > -1) {
      return true;
    }
    return super.canActivate(context);
  }
}

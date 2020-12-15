import { RequestWithUser } from './../middlewares/app.middleware';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: RequestWithUser = context.switchToHttp().getRequest();
    const roles = this.reflector.get<Array<string>>(
      'roles',
      context.getHandler(),
    );
    if (roles?.length && roles.indexOf(req.user?.role) < 0) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

import { UserDto } from '@data/dto/user.dto';
import { RequestWithUser } from './../middlewares/app.middleware';
import {
  createParamDecorator,
  SetMetadata,
  ExecutionContext,
} from '@nestjs/common';

export const Roles = (...roles) => SetMetadata('roles', roles);

export const UserInfos = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user[data] : user;
  },
);

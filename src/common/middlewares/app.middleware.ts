import { UserDto } from '@data/dto/user.dto';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: UserDto;
}

export const Logger = (req: RequestWithUser, res: Response, next: Function) => {
  next();
};

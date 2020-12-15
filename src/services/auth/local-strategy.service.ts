import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.authService.verifyUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

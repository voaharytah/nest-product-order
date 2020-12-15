import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtStrategyGuard } from './guards/jwtStrategy.guard';

export const common = [
  {
    provide: APP_GUARD,
    useClass: JwtStrategyGuard,
  },
];

import { AuthService } from '@services/auth/auth.service';
import { LocalStrategyGuard } from '@common/guards/localStrategy.guard';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalStrategyGuard)
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }
}

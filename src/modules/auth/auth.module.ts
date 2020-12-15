import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AuthController],
})
export class AuthModule {}

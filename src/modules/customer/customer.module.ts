import { ServicesModule } from '@services/services.module';
import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';

@Module({
  imports: [ServicesModule],
  controllers: [CustomerController],
})
export class CustomerModule {}

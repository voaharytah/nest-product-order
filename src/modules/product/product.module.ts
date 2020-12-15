import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [ServicesModule],
  controllers: [ProductController],
})
export class ProductModule {}

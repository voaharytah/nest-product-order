import { RowCommandRepository } from './rowCommand/rowCommand.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user/user.repository';
import { CommandRepository } from './command/command.repository';
import { ProductRepository } from './product/product.repository';
import { CustomerRepository } from './customer/customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      CommandRepository,
      ProductRepository,
      RowCommandRepository,
      CustomerRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}

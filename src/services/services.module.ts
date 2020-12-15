import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from './../repository/repository.module';
import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { LocalStrategyService } from './auth/local-strategy.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/jwt-strategy.service';
import { ProductService } from './product/product.service';
import { CustomerService } from './customer/customer.service';
import { CommandService } from './command/command.service';
import { FactoryModule } from '@data/factory/factory.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('appSecret'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
    RepositoryModule,
    FactoryModule,
  ],
  providers: [
    UserService,
    LocalStrategyService,
    AuthService,
    JwtStrategyService,
    ProductService,
    CustomerService,
    CommandService,
    TaskService,
  ],
  exports: [
    UserService,
    LocalStrategyService,
    AuthService,
    JwtStrategyService,
    ProductService,
    CustomerService,
    CommandService,
    TaskService,
  ],
})
export class ServicesModule {}

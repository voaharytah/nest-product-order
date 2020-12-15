import { config } from './common/config/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { common } from './common';
import { UserModule } from './modules/user/user.module';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseConfigService } from './common/config/config.service';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { FactoryModule } from '@data/factory/factory.module';
import { CommandModule } from './modules/command/command.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DatabaseConfigService,
    }),
    UserModule,
    ServicesModule,
    AuthModule,
    ProductModule,
    CustomerModule,
    FactoryModule,
    CommandModule,
    ScheduleModule.forRoot(),
  ],
  providers: [...common, DatabaseConfigService],
})
export class AppModule {}

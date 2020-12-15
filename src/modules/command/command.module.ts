import { ServicesModule } from '@services/services.module';
import { Module } from '@nestjs/common';
import { CommandController } from './controllers/command.controller';

@Module({
  imports: [ServicesModule],
  controllers: [CommandController],
})
export class CommandModule {}

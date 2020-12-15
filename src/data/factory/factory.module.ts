import { Module } from '@nestjs/common';
import { CommandFactory } from './command.factory';

@Module({ providers: [CommandFactory], exports: [CommandFactory] })
export class FactoryModule {}

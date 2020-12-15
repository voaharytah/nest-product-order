import { CommandFactory } from '@data/factory/command.factory';
import { Customer } from '@data/do/customer.entity';
import { CommandDto } from '@data/dto/command.dto';
import { CommandRepository } from '@repository/command/command.repository';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Product } from '@data/do/product.entity';
import { Command } from '@data/do/command.entity';
import { Criteria } from '@data/model/criteria.model';

@Injectable()
export class CommandService {
  constructor(
    private commandRepository: CommandRepository,
    private connection: Connection,
    private commandFactory: CommandFactory,
  ) {}

  saveCommand(commandDto: CommandDto) {
    return this.connection.transaction(async manager => {
      const productP = manager
        .getRepository(Product)
        .findByIds(commandDto.rowCommands.map(p => p.productId));
      const customerP = manager
        .getRepository(Customer)
        .findOne(commandDto.customerId);
      const command = this.commandFactory.createCommandDo(
        commandDto,
        await productP,
        await customerP,
      );
      const updatedProduct = this.commandFactory.updateProductStock(
        await productP,
        commandDto.rowCommands,
      );
      await manager.getRepository(Product).save(updatedProduct);
      return manager.getRepository(Command).save(command);
    });
  }

  async commandsList(criteria: Criteria) {
    const commands = this.commandRepository.commandsList(criteria);
    const count = this.commandRepository.commandsListCount(criteria);
    return this.commandFactory.createCommandListDto(
      await commands,
      await count,
    );
  }

  async commandsListByCustomer(criteria: Criteria) {
    const commands = this.commandRepository.commandsListByCustomer(criteria);
    const count = this.commandRepository.commandsListByCustomerCount(criteria);
    return this.commandFactory.createCommandListDto(
      await commands,
      await count,
    );
  }

  deleteComamnd(id: number) {
    return this.commandRepository.deleteCommand(id);
  }
}

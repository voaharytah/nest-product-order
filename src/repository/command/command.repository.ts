import { Criteria } from '@data/model/criteria.model';
import { Command } from '@data/do/command.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Command)
export class CommandRepository extends Repository<Command> {
  saveCommand(command: Command): Promise<Command> {
    return this.save(command);
  }

  getCommand(id: number): Promise<Command> {
    return this.findOne(id);
  }

  deleteCommand(id: number) {
    return this.delete(id);
  }

  commandsListQuery(criteria: Criteria) {
    return this.createQueryBuilder('command')
      .innerJoin('command.customer', 'customer')
      .innerJoin('command.rowCommands', 'rowCommands')
      .innerJoin('rowCommands.product', 'product')
      .select('SUM(product.pu * rowCommands.qte)', 'amount')
      .addSelect(['command', 'customer'])
      .groupBy('command.id')
      .orderBy('command.date', 'DESC');
  }

  commandsListCount(criteria: Criteria) {
    return this.commandsListQuery(criteria).getCount();
  }

  commandsList(criteria: Criteria): Promise<any[]> {
    return this.commandsListQuery(criteria)
      .offset(criteria.skip)
      .limit(criteria.take)
      .getRawMany();
  }

  commandsListByCustomerCount(criteria: Criteria) {
    return this.commandsListQuery(criteria)
      .where('customer.id =:id', {
        id: criteria.id,
      })
      .getCount();
  }

  commandsListByCustomer(criteria: Criteria) {
    return this.commandsListQuery(criteria)
      .where('customer.id =:id', {
        id: criteria.id,
      })
      .offset(criteria.skip)
      .limit(criteria.take)
      .getRawMany();
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Criteria } from '@data/model/criteria.model';
import { Customer } from '@data/do/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  saveCustomer(customer: Customer): Promise<Customer> {
    return this.save(customer);
  }

  deleteCustomer(id: number) {
    return this.delete(id);
  }

  customersList(criteria: Criteria): Promise<Customer[]> {
    return this.createQueryBuilder('customer')
      .skip(criteria.skip)
      .take(criteria.take)
      .getMany();
  }

  customerCa(id: number) {
    return this.createQueryBuilder('customer')
      .select('SUM(rowCommands.qte * product.pu)', 'CA')
      .addSelect(['customer.id', 'customer.name'])
      .innerJoin('customer.commands', 'commands')
      .innerJoin('commands.rowCommands', 'rowCommands')
      .innerJoin('rowCommands.product', 'product')
      .where('customer.id = :id', { id })
      .getRawOne();
  }

  customersSearchCount(criteria: Criteria) {
    return this.customersSearchQuery(criteria).getCount();
  }

  customersSearchQuery(criteria: Criteria) {
    return this.createQueryBuilder('customer')
      .select('SUM(rowCommands.qte * product.pu)', 'CA')
      .addSelect('customer')
      .leftJoin('customer.commands', 'commands')
      .leftJoin('commands.rowCommands', 'rowCommands')
      .leftJoin('rowCommands.product', 'product')
      .where('customer.name like :term', { term: `%${criteria.searchTerm}%` })
      .orWhere('customer.address like :term', {
        term: `%${criteria.searchTerm}%`,
      })
      .orWhere('customer.phone like :term', {
        term: `%${criteria.searchTerm}%`,
      })
      .orWhere('customer.id =:id', { id: criteria.searchTerm })
      .groupBy('customer.id')
      .orderBy('CA', 'DESC')
      .offset(criteria.skip)
      .limit(criteria.take);
  }

  allCustomerCa(criteria: Criteria) {
    return this.customersSearchQuery(criteria).getRawMany();
  }
}

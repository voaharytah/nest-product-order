import { Criteria } from '@data/model/criteria.model';
import { plainToClass } from 'class-transformer';
import { CustomerDto } from '@data/dto/customer.dto';
import { Customer } from '@data/do/customer.entity';
import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '@repository/customer/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  saveCustomer(customer: CustomerDto): Promise<Customer> {
    const customerDo = plainToClass(Customer, customer);
    return this.customerRepository.save(customerDo);
  }

  customersList(criteria: Criteria): Promise<Customer[]> {
    return this.customerRepository.customersList(criteria);
  }

  deleteCustomer(id: number) {
    return this.customerRepository.deleteCustomer(id);
  }

  customerCa(id: number) {
    return this.customerRepository.customerCa(id);
  }

  async allCustomerCa(criteria: Criteria) {
    const customers = this.customerRepository
      .allCustomerCa(criteria)
      .then(customers =>
        customers.map(c => ({
          id: c.customer_id,
          name: c.customer_name,
          address: c.customer_address,
          phone: c.customer_phone,
          ca: c.CA || 0,
        })),
      );
    const count = this.customerRepository.customersSearchCount(criteria);
    return {
      count: await count,
      customers: await customers,
    };
  }
}

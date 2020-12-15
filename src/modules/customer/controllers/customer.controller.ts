import { Criteria } from '@data/model/criteria.model';
import { CustomerDto } from '@data/dto/customer.dto';
import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CustomerService } from '@services/customer/customer.service';

@Controller('api/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('save')
  saveCustomer(@Body() customerDto: CustomerDto) {
    return this.customerService.saveCustomer(customerDto);
  }

  @Post('list')
  customersList(@Body() criteria: Criteria) {
    return this.customerService.customersList(criteria);
  }

  @Delete('delete/:id')
  deleteCustomer(@Param('id') id: number) {
    return this.customerService.deleteCustomer(id);
  }

  @Get('ca/:id')
  customerCa(@Param('id') id: number) {
    return this.customerService.customerCa(id);
  }

  @Post('ca')
  allCustomerCa(@Body() criteria: Criteria) {
    return this.customerService.allCustomerCa(criteria);
  }
}

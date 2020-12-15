import { RowCommand } from './../do/rowCommand.entity';
import { Customer } from './../do/customer.entity';
import { Product } from './../do/product.entity';
import { CommandDto, RowCommandDto } from './../dto/command.dto';
import { Command } from './../do/command.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandFactory {
  createCommandDo(
    commandDto: CommandDto,
    products: Product[],
    customer: Customer,
  ): Command {
    const command = new Command();
    command.customer = customer;
    command.rowCommands = products.map(p => {
      const row = new RowCommand();
      row.product = p;
      row.qte = commandDto.rowCommands.find(r => r.productId === p.id).qte;
      return row;
    });
    return command;
  }

  updateProductStock(
    products: Product[],
    rowComamnds: RowCommandDto[],
  ): Product[] {
    return products.map(p => ({
      ...p,
      stock: p.stock - rowComamnds.find(r => r.productId === p.id).qte,
    })) as Product[];
  }

  createCommandListDto(commands, count) {
    return {
      commands: commands.map(c => ({
        id: c.command_id,
        date: c.command_date,
        customer: c.customer_name,
        amount: c.amount,
      })),
      count: count,
    };
  }
}

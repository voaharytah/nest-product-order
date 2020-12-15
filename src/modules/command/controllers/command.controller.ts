import { CommandDto } from '@data/dto/command.dto';
import { Criteria } from '@data/model/criteria.model';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommandService } from '@services/command/command.service';

@Controller('api/command')
export class CommandController {
  constructor(private commandService: CommandService) {}

  @Post('save')
  saveCommand(@Body() commandDto: CommandDto) {
    return this.commandService.saveCommand(commandDto);
  }

  @Delete('delete/:id')
  deleteCommand(@Param('id') id: number) {
    return this.commandService.deleteComamnd(id);
  }

  @Post('list')
  commandsList(@Body() criteria: Criteria) {
    return this.commandService.commandsList(criteria);
  }

  @Post('list/:id')
  commandsListByCustomer(@Param('id') id: number, @Body() criteria: Criteria) {
    return this.commandService.commandsListByCustomer({
      ...criteria,
      id: id,
    });
  }
}

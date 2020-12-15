import { RowCommand } from '@data/do/rowCommand.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RowCommand)
export class RowCommandRepository extends Repository<RowCommand> {}

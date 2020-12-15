import { Product } from './product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Command } from './command.entity';

@Entity()
export class RowCommand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qte: number;

  @ManyToOne(
    type => Product,
    product => product.rowCommands,
    { onDelete: 'CASCADE' },
  )
  product: Product;

  @ManyToOne(
    type => Command,
    command => command.rowCommands,
    { onDelete: 'CASCADE' },
  )
  command: Command;
}

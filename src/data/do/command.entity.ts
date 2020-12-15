import { RowCommand } from './rowCommand.entity';
import { Customer } from './customer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(
    type => Customer,
    customer => customer.commands,
    { onDelete: 'CASCADE' },
  )
  customer: Customer;

  @OneToMany(
    type => RowCommand,
    rowCommand => rowCommand.command,
    { cascade: true },
  )
  rowCommands: RowCommand[];

  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }
}

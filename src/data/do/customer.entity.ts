import { Command } from './command.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(
    type => Command,
    command => command.customer,
  )
  commands: Command[];
}

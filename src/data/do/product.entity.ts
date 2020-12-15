import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RowCommand } from './rowCommand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  label: string;

  @Column()
  stock: number;

  @Column()
  createdDate: Date;

  @Column()
  pu: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  photo?: string;

  @OneToMany(
    type => RowCommand,
    rowCommand => rowCommand.product,
  )
  rowCommands: RowCommand[];

  @BeforeInsert()
  setDate() {
    this.createdDate = new Date();
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expense } from 'src/expense/entities/expense.entity';

@Entity()
export class ExpenseCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @ApiProperty({ default: true })
  @Column({ default: true })
  isactive: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.category, {
    onDelete: 'SET NULL',
  })
  expense: Expense[];
}

import { ExpenseCategory } from './../../expense_category/entities/expense_category.entity';
import { Income } from './../../income/entities/income.entity';
import { Reminder } from './../../reminder/entities/reminder.entity';
import { Expense } from './../../expense/entities/expense.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  @Exclude()
  password: string;

  @Column()
  @ApiProperty()
  gender: string;

  @ApiProperty({ default: true })
  @Column({ default: true })
  isactive: boolean;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  avator: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => ExpenseCategory, (expenseCat) => expenseCat.user, {
    onDelete: 'CASCADE',
  })
  expense_category: ExpenseCategory[];

  @OneToMany(() => Expense, (expense) => expense.user, { onDelete: 'SET NULL' })
  expense: Expense[];

  @OneToMany(() => Reminder, (reminder) => reminder, { onDelete: 'SET NULL' })
  reminders: Reminder[];

  @OneToMany(() => Income, (income) => income.user, { onDelete: 'CASCADE' })
  incomes: Income[];
}

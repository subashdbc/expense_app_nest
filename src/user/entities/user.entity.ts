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

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({ select: false })
  @ApiProperty()
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

  @OneToMany(() => Expense, (expense) => expense.user, { onDelete: 'SET NULL' })
  expense: Expense[];

  @OneToMany(() => Reminder, (reminder) => reminder, { onDelete: 'SET NULL' })
  reminders: Reminder[];

  @OneToMany(() => Income, (income) => income.user, { onDelete: 'CASCADE' })
  incomes: Income[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expense } from 'src/expense/entities/expense.entity';
import { User } from 'src/user/entities/user.entity';
import { IsNumber } from 'class-validator';

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

  @ApiProperty()
  @Column({ name: 'user_id' })
  @IsNumber()
  userId: number;

  @ManyToOne(() => User, (user) => user.expense_category)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Expense, (expense) => expense.category, {
    onDelete: 'SET NULL',
  })
  expense: Expense[];
}

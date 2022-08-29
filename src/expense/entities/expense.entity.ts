import { ExpenseCategory } from './../../expense_category/entities/expense_category.entity';
import { User } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Expense {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column({ nullable: true })
  @IsString()
  notes: string;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.expense)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ExpenseCategory, (expCategory) => expCategory.expense)
  @JoinColumn({ name: 'category_id' })
  category: ExpenseCategory;
}

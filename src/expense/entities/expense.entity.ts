import { ExpenseCategory } from './../../expense_category/entities/expense_category.entity';
import { User } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  amount: number;

  @Column()
  notes: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.expense)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ExpenseCategory, (expCategory) => expCategory.expense)
  @JoinColumn({ name: 'category_id' })
  category: ExpenseCategory;
}

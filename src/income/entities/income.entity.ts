import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { Expense } from 'src/expense/entities/expense.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

@Entity()
export class Income {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsDateString()
  @Column()
  receivedOn: Date;

  @ManyToOne(() => User, (user) => user.incomes)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

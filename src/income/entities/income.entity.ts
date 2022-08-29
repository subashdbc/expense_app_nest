import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column({ nullable: true })
  @IsString()
  comments: string;

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

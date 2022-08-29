import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty()
  date: Date;

  @IsInt()
  @ApiProperty()
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  notes: string;

  @IsNumber()
  @ApiProperty()
  categoryId: number;
}

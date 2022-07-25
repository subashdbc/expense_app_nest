import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class Pagination {
  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  select: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  relations: string[] | null;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  order: Dictionary<string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  skip: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  take: number;
}

interface Dictionary<T> {
  [key: string]: T;
}

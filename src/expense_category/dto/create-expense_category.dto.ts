import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateExpenseCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsBoolean()
  @ApiProperty()
  isactive: boolean;
}

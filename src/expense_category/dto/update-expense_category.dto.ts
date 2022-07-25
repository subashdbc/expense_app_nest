import { PartialType } from '@nestjs/swagger';
import { CreateExpenseCategoryDto } from './create-expense_category.dto';

export class UpdateExpenseCategoryDto extends PartialType(
  CreateExpenseCategoryDto,
) {}

import { ExpenseCategory } from './entities/expense_category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategoryController } from './expense_category.controller';
import { ExpenseCategoryService } from './expense_category.service';
import { CurrentUserModule } from 'src/providers/currentUser.module';

@Module({
  imports: [CurrentUserModule, TypeOrmModule.forFeature([ExpenseCategory])],
  controllers: [ExpenseCategoryController],
  providers: [ExpenseCategoryService],
  exports: [ExpenseCategoryService],
})
export class ExpenseCategoryModule {}

import { ExpenseCategoryModule } from './../expense_category/expense_category.module';
import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { UserModule } from 'src/user/user.module';
import { CurrentUserModule } from 'src/providers/currentUser.module';

@Module({
  imports: [
    CurrentUserModule,
    ExpenseCategoryModule,
    UserModule,
    TypeOrmModule.forFeature([Expense]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}

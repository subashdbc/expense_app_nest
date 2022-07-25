import { ExpenseCategory } from './expense_category/entities/expense_category.entity';
import { Reminder } from './reminder/entities/reminder.entity';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Expense } from './expense/entities/expense.entity';
import { ReminderModule } from './reminder/reminder.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExpenseCategoryModule } from './expense_category/expense_category.module';
import { IncomeModule } from './income/income.module';
import { Income } from './income/entities/income.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ExpenseModule,
    ReminderModule,
    ExpenseCategoryModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'expenses.db.sqlite',
      entities: [User, Expense, Reminder, ExpenseCategory, Income],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    IncomeModule,
  ],
})
export class AppModule {}

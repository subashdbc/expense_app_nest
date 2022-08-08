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
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    UserModule,
    ExpenseModule,
    ReminderModule,
    ExpenseCategoryModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Expense, Reminder, ExpenseCategory, Income],
      synchronize: false,
    }),
    ScheduleModule.forRoot(),
    IncomeModule,
  ],
})
export class AppModule {}

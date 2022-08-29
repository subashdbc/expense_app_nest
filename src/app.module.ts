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
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DATABASE_URL'),
          port: config.get<number>('DATABASE_PORT'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          database: config.get<string>('DATABASE_NAME'),
          entities: [User, Expense, Reminder, ExpenseCategory, Income],
          synchronize: true,
        };
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    ExpenseModule,
    ReminderModule,
    ExpenseCategoryModule,
    IncomeModule,
  ],
})
export class AppModule {}

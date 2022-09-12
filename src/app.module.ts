import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { ReminderModule } from './reminder/reminder.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExpenseCategoryModule } from './expense_category/expense_category.module';
import { IncomeModule } from './income/income.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './typeorm.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // TypeOrmModule.forRootAsync(typeOrmConnectionDataSource),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'mysql',
    //       host: config.get<string>('DATABASE_URL'),
    //       port: config.get<number>('DATABASE_PORT'),
    //       username: config.get<string>('DATABASE_USER'),
    //       password: config.get<string>('DATABASE_PASSWORD'),
    //       database: config.get<string>('DATABASE_NAME'),
    //       entities: [User, Expense, Reminder, ExpenseCategory, Income],
    //       synchronize: true,
    //     };
    //   },
    // }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    ExpenseModule,
    ReminderModule,
    ExpenseCategoryModule,
    IncomeModule,
    TypeOrmModule,
  ],
})
export class AppModule {}

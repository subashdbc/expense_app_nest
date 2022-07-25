import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderController } from './reminder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserModule } from 'src/providers/currentUser.module';
import { UserModule } from 'src/user/user.module';
import { Reminder } from './entities/reminder.entity';

@Module({
  imports: [
    CurrentUserModule,
    UserModule,
    TypeOrmModule.forFeature([Reminder]),
  ],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}

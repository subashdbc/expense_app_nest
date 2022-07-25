import { Income } from './entities/income.entity';
import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserModule } from 'src/providers/currentUser.module';

@Module({
  imports: [CurrentUserModule, TypeOrmModule.forFeature([Income])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}

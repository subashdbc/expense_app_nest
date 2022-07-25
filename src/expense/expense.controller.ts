import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { enumDefaultedMember } from '@babel/types';

@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAllWithUser();
  }

  @Get('/expense_data')
  getAllExpenseData() {
    return this.expenseService.getTotalExpenseAndPerMonthExpense();
  }

  @Get('/by_category')
  getDataByCategory() {
    return this.expenseService.getDataGroupedByCategory();
  }

  @Post('/month_data')
  getWeekExpenseData(@Body() body: { startDate: Date; endDate: Date }) {
    return this.expenseService.getMonthlyDataGroupedByDate(
      body.startDate,
      body.endDate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Post('/detailed_view')
  findAllWithGrouping(@Body() body: { date: Date }) {
    return this.expenseService.filterByMonth(body.date);
  }

  @Post('/pagination')
  pagination(@Body() body: Pagination) {
    return this.expenseService.pagination(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}

import { ExpenseCategoryService } from './../expense_category/expense_category.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, Between } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { User } from 'src/user/entities/user.entity';
import { Pagination } from 'src/shared/dto/pagination.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    private expenseCategoryService: ExpenseCategoryService,
    @Inject('CURRENT_USER') private readonly currentUser: any,
  ) {}
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const getCurrentUser: User = this.currentUser.user;
    const expenseCategory = await this.expenseCategoryService.findOne(
      createExpenseDto.categoryId,
    );
    const expense = this.expenseRepo.create(createExpenseDto);
    expense.user = getCurrentUser;
    expense.userId = getCurrentUser.id;
    if (expenseCategory) {
      expense.category = expenseCategory;
    }
    return this.expenseRepo.save(expense);
  }

  async findAll(): Promise<Expense[]> {
    const getCurrentUser: User = this.currentUser.user;
    return await this.expenseRepo.find({
      where: { userId: getCurrentUser.id },
    });
  }

  async findAllWithUser(): Promise<Expense[]> {
    const getCurrentUser: User = this.currentUser.user;
    return await this.expenseRepo.find({
      where: { userId: getCurrentUser.id },
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Expense> {
    return this.expenseRepo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<UpdateResult> {
    return await this.expenseRepo.update(id, updateExpenseDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.expenseRepo.delete(id);
  }

  async pagination(pagination: Pagination): Promise<Expense[]> {
    const getCurrentUser: User = this.currentUser.user;
    const selectVal = {};
    if (pagination.select) {
      pagination.select.map((x) => {
        selectVal[x] = true;
      });
    }
    const realtionVal = {};
    if (pagination.relations) {
      pagination.relations.map((x) => {
        realtionVal[x] = true;
      });
    }
    return await this.expenseRepo.find({
      select: selectVal,
      relations: realtionVal,
      order: pagination.order,
      skip: pagination.skip,
      take: pagination.take,
      where: { userId: getCurrentUser.id },
      cache: true,
    });
  }

  async filterByMonth(date: Date) {
    const getCurrentUser: User = this.currentUser.user;
    const firstDate: Date = dayjs(date).toDate();
    const lastDate: Date = dayjs(date).endOf('month').toDate();
    const results = await this.expenseRepo.find({
      where: {
        date: Between(firstDate, lastDate),
        userId: getCurrentUser.id,
      },
      order: {
        date: 'DESC',
      },
    });
    return results;
  }

  async getTotalExpenseAndPerMonthExpense() {
    const date = dayjs().format('YYYY-MM 23:59:59');
    const getCurrentUser: User = this.currentUser.user;
    const firstDate: string = dayjs(date).format('YYYY-MM-DDT00:00:00');
    const lastDate: string = dayjs()
      .endOf('month')
      .format('YYYY-MM-DDT23:00:00');

    const { month_expense } = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'month_expense')
      .where('date >= :fDate and date <= :lDate and user_id = :userId', {
        fDate: firstDate,
        lDate: lastDate,
        userId: getCurrentUser.id,
      })
      .getRawOne();
    const { total_expense } = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total_expense')
      .where('user_id = :userId', {
        userId: getCurrentUser.id,
      })
      .getRawOne();
    return { month_expense, total_expense };
  }

  async getMonthlyDataGroupedByDate(startDate: Date, endDate: Date) {
    const getCurrentUser: User = this.currentUser.user;
    const data = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('expense.date', 'date')
      .addSelect('SUM(expense.amount)', 'amount')
      .where('date >= :fDate and date <= :lDate and user_id = :userId', {
        fDate: startDate,
        lDate: endDate,
        userId: getCurrentUser.id,
      })
      .groupBy('expense.date')
      .getRawMany();
    const viewDate = { labels: [], data: [] };
    data.map((x) => {
      const date = dayjs(x.date).format('DD ddd');
      viewDate.labels.push(date);
      viewDate.data.push(x.amount);
    });
    return viewDate;
  }

  async getDataGroupedByCategory() {
    const getCurrentUser: User = this.currentUser.user;
    const data = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('category.name', 'name')
      .addSelect('SUM(expense.amount)', 'amount')
      .leftJoinAndSelect('expense.category', 'category')
      .where('category.user_id = :userId', {
        userId: getCurrentUser.id,
      })
      .groupBy('expense.category')
      .getRawMany();

    const viewDate = { labels: [], data: [] };
    data.map((x) => {
      viewDate.labels.push(x.name);
      viewDate.data.push(x.amount);
    });
    return viewDate;
  }
}

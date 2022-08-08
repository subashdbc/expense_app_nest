import { UpdateExpenseCategoryDto } from './dto/update-expense_category.dto';
import { CreateExpenseCategoryDto } from './dto/create-expense_category.dto';
import { ExpenseCategory } from './entities/expense_category.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private expenseCateRepository: Repository<ExpenseCategory>,
    @Inject('CURRENT_USER') private readonly currentUser: any,
  ) {}

  async create(
    createCategoryDto: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategory> {
    const getCurrentUser: User = this.currentUser.user;
    const expenseCate = this.expenseCateRepository.create(createCategoryDto);
    expenseCate.user = getCurrentUser;
    expenseCate.userId = getCurrentUser.id;
    return await this.expenseCateRepository.save(expenseCate);
  }

  async findAll(): Promise<ExpenseCategory[]> {
    return await this.expenseCateRepository.find();
  }

  async findOne(id: number): Promise<ExpenseCategory> {
    return await this.expenseCateRepository.findOne({ where: { id } });
  }

  async pagination(
    pagination: Pagination,
  ): Promise<[ExpenseCategory[], number]> {
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
    return await this.expenseCateRepository.findAndCount({
      select: selectVal,
      relations: realtionVal,
      order: pagination.order,
      skip: pagination.skip,
      take: pagination.take,
      cache: true,
    });
  }
  async findWithExpenses(id: number): Promise<any> {
    return await this.expenseCateRepository.find({
      where: {
        id,
      },
      relations: {
        expense: true,
      },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateExpenseCategoryDto,
  ): Promise<UpdateResult> {
    return await this.expenseCateRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.expenseCateRepository.delete(id);
  }
}

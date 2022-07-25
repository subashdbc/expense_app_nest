import { UpdateExpenseCategoryDto } from './dto/update-expense_category.dto';
import { CreateExpenseCategoryDto } from './dto/create-expense_category.dto';
import { ExpenseCategory } from './entities/expense_category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private expenseCategoryRepository: Repository<ExpenseCategory>,
  ) {}

  async create(
    createCategoryDto: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategory> {
    return await this.expenseCategoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<ExpenseCategory[]> {
    return await this.expenseCategoryRepository.find();
  }

  async findOne(id: number): Promise<ExpenseCategory> {
    return await this.expenseCategoryRepository.findOne({ where: { id } });
  }

  async pagination(pagination: Pagination): Promise<ExpenseCategory[]> {
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
    return await this.expenseCategoryRepository.find({
      select: selectVal,
      relations: realtionVal,
      order: pagination.order,
      skip: pagination.skip,
      take: pagination.take,
      cache: true,
    });
  }
  async findWithExpenses(id: number): Promise<any> {
    return await this.expenseCategoryRepository.find({
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
    return await this.expenseCategoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.expenseCategoryRepository.delete(id);
  }
}

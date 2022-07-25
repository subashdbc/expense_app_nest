import { CreateIncomeDto } from './dto/create-income.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { Between, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Income } from './entities/income.entity';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { User } from 'src/user/entities/user.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class IncomeService {
  constructor(
    @Inject('CURRENT_USER') private readonly currentUser: any,
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const getCurrentUser: User = this.currentUser.user;
    const income = await this.incomeRepository.create(createIncomeDto);
    income.user = getCurrentUser;
    income.userId = getCurrentUser.id;
    return await this.incomeRepository.save(income);
  }

  async findAll(): Promise<Income[]> {
    return await this.incomeRepository.find();
  }

  async findOne(id: number): Promise<Income> {
    return await this.incomeRepository.findOne({ where: { id } });
  }

  async pagination(pagination: Pagination): Promise<Income[]> {
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
    return await this.incomeRepository.find({
      select: selectVal,
      relations: realtionVal,
      order: pagination.order,
      skip: pagination.skip,
      take: pagination.take,
      cache: true,
    });
  }

  async update(
    id: number,
    updateIncomeDto: UpdateIncomeDto,
  ): Promise<UpdateResult> {
    return await this.incomeRepository.update(id, updateIncomeDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.incomeRepository.delete(id);
  }

  async getTotalIncomeAndPerMonthIncome() {
    const date = dayjs().format('YYYY-MM 23:59:59');

    const firstDate: string = dayjs(date).format('YYYY-MM-DDT00:00:00');
    const lastDate: string = dayjs()
      .endOf('month')
      .format('YYYY-MM-DDT23:00:00');

    const { month_income } = await this.incomeRepository
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'month_income')
      .where('receivedOn >= :fDate and receivedOn <= :lDate', {
        fDate: firstDate,
        lDate: lastDate,
      })
      .getRawOne();
    const { total_income } = await this.incomeRepository
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'total_income')
      .getRawOne();
    return { month_income, total_income };
  }
}

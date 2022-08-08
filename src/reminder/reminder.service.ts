import { Reminder } from './entities/reminder.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class ReminderService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Reminder) private reminderRepo: Repository<Reminder>,
    @Inject('CURRENT_USER') private readonly currentUser: any,
  ) {}
  async create(createExpenseDto: CreateReminderDto): Promise<Reminder> {
    const getCurrentUser: User = this.currentUser.user;
    const reminder = this.reminderRepo.create(createExpenseDto);
    reminder.user = getCurrentUser;
    reminder.userId = getCurrentUser.id;
    return this.reminderRepo.save(reminder);
  }

  async findAll(): Promise<Reminder[]> {
    return await this.reminderRepo.find();
  }

  async findAllWithUser(): Promise<Reminder[]> {
    return await this.reminderRepo.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Reminder> {
    return this.reminderRepo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async update(
    id: number,
    updateExpenseDto: UpdateReminderDto,
  ): Promise<UpdateResult> {
    return await this.reminderRepo.update(id, updateExpenseDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.reminderRepo.delete(id);
  }

  async pagination(pagination: Pagination): Promise<[Reminder[], number]> {
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
    return await this.reminderRepo.findAndCount({
      select: selectVal,
      relations: realtionVal,
      order: pagination.order,
      skip: pagination.skip,
      take: pagination.take,
      cache: true,
    });
  }

  createJob() {
    const job = new CronJob(CronExpression.EVERY_WEEK, () => true);

    this.schedulerRegistry.addCronJob('new job', job);
    job.start();
  }
}

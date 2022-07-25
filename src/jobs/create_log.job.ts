import { createFile } from 'src/helper/storage.helper';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { join } from 'path';
import * as dayjs from 'dayjs';

@Injectable()
export class CronJobsService {
  private readonly logger = new Logger(CronJobsService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createExceptionFile() {
    const filePath = join(__dirname, '../../', 'logs');
    const fileName = `logs_${dayjs().format('DD_MM_YYYY')}.log`;
    await createFile(filePath, fileName, '');
  }
}

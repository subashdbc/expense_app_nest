import { UpdateReminderDto } from './dto/update-reminder.dto';
import { CreateReminderDto } from './dto/create-reminder.dto';
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
import { Pagination } from 'src/shared/dto/pagination.dto';
import { ReminderService } from './reminder.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('reminders')
@Controller('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post()
  create(@Body() createExpenseDto: CreateReminderDto) {
    return this.reminderService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.reminderService.findAllWithUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reminderService.findOne(+id);
  }

  @Post('/pagination')
  pagination(@Body() body: Pagination) {
    return this.reminderService.pagination(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateReminderDto) {
    return this.reminderService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reminderService.remove(+id);
  }
}

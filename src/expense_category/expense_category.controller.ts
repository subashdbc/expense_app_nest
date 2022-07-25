import { UpdateExpenseCategoryDto } from './dto/update-expense_category.dto';
import { CreateExpenseCategoryDto } from './dto/create-expense_category.dto';
import { ExpenseCategoryService } from './expense_category.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Pagination } from 'src/shared/dto/pagination.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('expenses_category')
@Controller('expenses_category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateExpenseCategoryDto) {
    return this.expenseCategoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.expenseCategoryService.findAll();
  }

  @Post('/pagination')
  pagination(@Body() body: Pagination) {
    return this.expenseCategoryService.pagination(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseCategoryService.findOne(+id);
  }

  @Get('expenses/:id')
  findWithExpenses(@Param('id', ParseIntPipe) id: number) {
    return this.expenseCategoryService.findWithExpenses(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return this.expenseCategoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseCategoryService.remove(+id);
  }
}

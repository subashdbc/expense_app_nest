import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseCategoryController } from './expense_category.controller';
import { ExpenseCategoryService } from './expense_category.service';

describe('ExpenseCategoryController', () => {
  let controller: ExpenseCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseCategoryController],
      providers: [ExpenseCategoryService],
    }).compile();

    controller = module.get<ExpenseCategoryController>(
      ExpenseCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

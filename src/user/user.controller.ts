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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Pagination } from 'src/shared/dto/pagination.dto';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Post('/pagination')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  pagination(@Body() body: Pagination) {
    return this.userService.pagination(body);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('expenses/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findWithExpenses(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findWithExpenses(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

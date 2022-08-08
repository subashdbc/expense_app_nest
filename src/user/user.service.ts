import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check if user already exists
    const allUsers = await this.usersRepository.find();
    const userObj = allUsers.find((x) => x.email === createUserDto.email);
    if (userObj) {
      throw new InternalServerErrorException('Email already exists!');
    }
    // hashing the password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async pagination(pagination: Pagination): Promise<[User[], number]> {
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
    const result = await this.usersRepository.findAndCount({
      select: selectVal,
      relations: realtionVal,
      order: pagination.order,
      skip: pagination.skip,
      take: pagination.take,
      cache: true,
    });
    return result;
  }
  async findWithExpenses(id: number): Promise<any> {
    return await this.usersRepository.find({
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
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}

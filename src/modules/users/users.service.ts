import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Connection, Repository } from 'typeorm';
import { CreateUserBasicDto } from './dto/create-user-basic.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(createProfileDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  createBasic(createProfileDto: CreateUserBasicDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }
  async findManyWithPagination(paginationOptions: IPaginationOptions) {
    const [result, total] = await this.usersRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return {
      data: result,
      total,
    };
  }

  async findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

}

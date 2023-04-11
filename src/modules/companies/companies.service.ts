import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companiesRepository.save(
      this.companiesRepository.create(createCompanyDto),
    );
  }

  async findManyWithPagination(paginationOptions: IPaginationOptions) {
    const [result, total] = await this.companiesRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: {
        name: 'ASC',
      },
    });
    return { data: result, total };
  }

  async findOne(fields: EntityCondition<Company>) {
    return await this.companiesRepository.findOne({
      where: fields,
    });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return await this.companiesRepository.update(id, updateCompanyDto);
  }

  async softDelete(id: string): Promise<void> {
    await this.companiesRepository.softDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoriesRepository: Repository<Inventory>,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    return this.inventoriesRepository.save(
      this.inventoriesRepository.create(createInventoryDto),
    );
  }

  async findManyWithPagination(paginationOptions: IPaginationOptions) {
    const qb = this.inventoriesRepository.createQueryBuilder('inventory');
    qb.innerJoinAndSelect('inventory.company', 'company');
    qb.orderBy('inventory.name', 'ASC');
    qb.where('company.deleted_at IS NULL');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);
    const [result, total] = await qb.getManyAndCount();
    return { data: result, total };
  }

  findOne(fields: EntityCondition<Inventory>) {
    return this.inventoriesRepository.findOne({
      where: fields,
    });
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    return await this.inventoriesRepository.update(id, updateInventoryDto);
  }

  async softDelete(id: string): Promise<void> {
    await this.inventoriesRepository.softDelete(id);
  }
}

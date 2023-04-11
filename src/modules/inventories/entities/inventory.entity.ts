import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Company } from 'src/modules/companies/entities/company.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { ManyToOne } from 'typeorm';

@Entity({ name: 'inventories' })
export class Inventory extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'name', default: '' })
  name: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'value' })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

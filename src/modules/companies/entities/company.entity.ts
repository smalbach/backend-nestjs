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

import { EntityHelper } from 'src/utils/entity-helper';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'companies' })
export class Company extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', default: '' })
  name: string;

  @Column({ name: 'address', default: '' })
  address: string;

  @Column({ name: 'nit', unique: true })
  nit: string;

  @Column({ name: 'phone', default: '' })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

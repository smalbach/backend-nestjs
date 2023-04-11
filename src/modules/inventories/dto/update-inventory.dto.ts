import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { Company } from 'src/modules/companies/entities/company.entity';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
   @ApiProperty({ example: 'string name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: 'status entity',
    type: () => Company,
  })
  @IsOptional()
  company: Company;
}

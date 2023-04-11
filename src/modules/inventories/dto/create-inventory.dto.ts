import { IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/modules/companies/entities/company.entity';

export class CreateInventoryDto {
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

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ example: 'string name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'string address' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'string phone' })
  @IsNotEmpty()
  phone: string;
}

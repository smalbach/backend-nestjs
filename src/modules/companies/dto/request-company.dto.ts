import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestCompanyDto {
  @ApiProperty({ example: 'nit' })
  @IsNotEmpty()
  nit: string;
}

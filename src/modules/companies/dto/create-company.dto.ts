import { IsNotEmpty, Validate } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';

export class CreateCompanyDto {
  @ApiProperty({ example: 'string name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'string address' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'string nit' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @Validate(IsNotExist, ['Company'], {
    message: 'nitAlreadyExists',
  })
  @IsNotEmpty()
  nit: string;

  @ApiProperty({ example: 'string phone' })
  @IsNotEmpty()
  phone: string;
}

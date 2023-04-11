import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RequestInventoryEmailDto {
  @ApiProperty({ example: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

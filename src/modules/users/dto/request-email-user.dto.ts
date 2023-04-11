import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestUserEmailDto {
  @ApiProperty({ example: 'email' })
  @IsNotEmpty()
  email: string;
}

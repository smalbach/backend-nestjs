import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AuthUpdateDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword: string;

  @ApiProperty({ example: 'email' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  provider: string;

  @ApiProperty({ example: '3233123' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  socialId: string;

  @ApiProperty({ example: 'customer or guest' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  type: string;

  @ApiProperty({ example: '3000000000' })
  @IsOptional()
  @MinLength(10)
  @MaxLength(20)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  phone: string;

  @ApiProperty({ example: '3000000000' })
  @IsOptional()
  whatsapp: string;

  @ApiProperty({ example: 'Avenida simpre viva 123' })
  @MaxLength(200)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  address: string;

  @ApiProperty({ example: 'Colombia' })
  @MaxLength(50)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  countryOfOrigin: string;

  @ApiProperty({ example: 'Colombia' })
  @MaxLength(50)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  nationalitie: string;

  @ApiProperty({ example: 'M or F od O' })
  @MaxLength(50)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  gender: string;

  @ApiProperty({ example: 'Bogota' })
  @MaxLength(50)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  timeZone: string;

  @ApiProperty({ example: 'es' })
  @MaxLength(50)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  language: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  birth: Date;
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { Role } from '../../roles/entities/role.entity';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'ejample@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  hash?: string | null;
}

import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { Role } from '../../roles/entities/role.entity';
import { Transform } from 'class-transformer';

export class CreateUserBasicDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty()
  role?: Role | null;
}

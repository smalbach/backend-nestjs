import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RequestUserDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  page: number | 1;

  @ApiProperty({ example: 50 })
  @IsOptional()
  limit: number | 50;

  @ApiProperty({ example: 'start date' })
  @IsOptional()
  startDate: string;

  @ApiProperty({ example: 'start date' })
  @IsOptional()
  endDate: string;

  @ApiProperty({ example: 'id' })
  @IsOptional()
  id: string;

  @ApiProperty({ example: 'search' })
  @IsOptional()
  search: string;

  @ApiProperty({ example: 'createdAt' })
  @IsOptional()
  createdAt: string;

  @ApiProperty({ example: 'nationalitie' })
  @IsOptional()
  nationalitie: string;

  @ApiProperty({ example: 'countryOfOrigin' })
  @IsOptional()
  countryOfOrigin: string;

  @ApiProperty({ example: 'firstService' })
  @IsOptional()
  firstService: string;

  @ApiProperty({ example: 'lastService' })
  @IsOptional()
  lastService: string;
}

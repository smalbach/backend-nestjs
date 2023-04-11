import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  Delete,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { CompaniesService } from './companies.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { Roles } from 'src/modules/roles/roles.decorator';
import { RequestCompanyDto } from './dto/request-company.dto';
 

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Companies')
@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @Roles(RoleEnum.admin, RoleEnum.user)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    const { data, total } = await this.companiesService.findManyWithPagination({
      page,
      limit,
    });
    return infinityPagination(data, { page, limit }, total);
  }

  @Get(':id')
  @Roles(RoleEnum.admin, RoleEnum.user)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne({ id: id });
  }
  @Post('searchByNIT')
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  findByNIT(@Body() requestCompanyDto: RequestCompanyDto) {
    const data = this.companiesService.findOne({ nit: requestCompanyDto.nit });
    return data;
  }

  @Post()
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Put(':id')
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.companiesService.softDelete(id);
  }
}

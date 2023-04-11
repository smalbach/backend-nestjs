import {
  Controller,
  Get,
  Param,
  Request,
  HttpStatus,
  HttpCode,
  Delete,
  Post,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { Roles } from 'src/modules/roles/roles.decorator';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { RequestInventoryEmailDto } from './dto/request-inventory-email.dto';
import { MailService } from 'src/mail/mail.service';
import { MailData } from 'src/mail/interfaces/mail-data.interface';
import { generatePDF } from 'src/utils/generatePDF';
import convertDataInventory from 'src/utils/generatePDF/convertDataInventory';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Inventories')
@Controller({
  path: 'inventories',
  version: '1',
})
@UseInterceptors(ClassSerializerInterceptor)
export class InventoriesController {
  constructor(
    private readonly inventoriesService: InventoriesService,
    private readonly mailService: MailService
    ,) {}

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
    const { data, total } =
      await this.inventoriesService.findManyWithPagination({
        page,
        limit,
      });
    return infinityPagination(data, { page, limit }, total);
  }

  @Get(':id')
  @Roles(RoleEnum.admin, RoleEnum.user)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.inventoriesService.findOne({ id: +id });
  }

  @Post()
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Request() request, @Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Put(':id')
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateInventoryDto,
  ) {
    return await this.inventoriesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.inventoriesService.softDelete(id);
  }

  @Post('sendEmail')
  @Roles(RoleEnum.admin, RoleEnum.user)
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Body() dataEmail: RequestInventoryEmailDto) {
    const pagination: IPaginationOptions = { page: 1, limit: 50 };
    const { data } = await this.inventoriesService.findManyWithPagination(
      pagination,
    );
    const column = ['Nombre', 'Empresa', 'Cantidad', 'valor'];
    const convertedData = await convertDataInventory(data);

    const inventory = await generatePDF(convertedData, column);

    return await this.mailService.sendEmail(dataEmail.email, inventory);
  }

}

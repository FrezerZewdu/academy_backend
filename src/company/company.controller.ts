import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { HasRoles } from 'src/auth/decorator';
import { Roles } from 'src/auth/dto/enums';
import { createBillsDto, createCompanyDto, editCompanyDto } from './dto';

@UseGuards(JwtGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.supervisor, Roles.registrar)
  fetchAllCompanies(@Query('search') search?: string) {
    return this.companyService.fetchAllCompanies({ search });
  }

  @Post()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin)
  createCompany(@Body() companyInfo: createCompanyDto) {
    return this.companyService.createCompany(companyInfo);
  }

  @Put()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.supervisor, Roles.registrar)
  updateCompany(@Body() companyInfo: editCompanyDto) {
    return this.companyService.editCompany(companyInfo);
  }

  @Delete(':companyId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin)
  deleteCompany(@Param('companyId') companyId: string) {
    return this.companyService.deleteCompany(parseInt(companyId));
  }

  @Post('bill')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.supervisor)
  createBill(@Body() billInfo: createBillsDto) {
    return this.companyService.createCompanyBill(billInfo);
  }

  @Put('bill/status/:billId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.supervisor)
  updateBillStatus(@Param('billId') billId: string, @Body() status: string) {
    return this.companyService.updateBillStatus(parseInt(billId), status);
  }
}

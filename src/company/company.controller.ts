import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { HasRoles } from 'src/auth/decorator';
import { Roles } from 'src/auth/dto/enums';
import {
  createBillsDto,
  createCompanyDto,
  editCompanyDto,
  statusDto,
} from './dto';

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

  @Get(':companyId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.supervisor)
  fetchCompanyDetailById(@Param('companyId') companyId: string) {
    const companyIdNumber = parseInt(companyId);
    if (Number.isNaN(companyIdNumber)) {
      throw new UnprocessableEntityException(
        'The company ID passed is not a number',
      );
    }
    return this.companyService.companyDetailById(companyIdNumber);
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
    const companyIdNumber = parseInt(companyId);
    if (Number.isNaN(companyIdNumber)) {
      throw new UnprocessableEntityException(
        'The company ID passed is not a number',
      );
    }
    return this.companyService.deleteCompany(companyIdNumber);
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
  updateBillStatus(
    @Param('billId') billId: string,
    @Body() statusBody: statusDto,
  ) {
    const billIdNumber = parseInt(billId);
    if (Number.isNaN(billIdNumber)) {
      throw new UnprocessableEntityException(
        'The Bill ID passed is not a number',
      );
    }
    return this.companyService.updateBillStatus(
      billIdNumber,
      statusBody.status,
    );
  }
}

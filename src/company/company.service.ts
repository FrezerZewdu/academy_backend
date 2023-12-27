import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  companiesFilterDto,
  createBillsDto,
  createCompanyDto,
  editCompanyDto,
} from './dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async fetchAllCompanies(filter: companiesFilterDto) {
    try {
      const companies = await this.prisma.company.findMany({
        where: {
          name: {
            contains: filter.search ? filter.search : undefined,
          },
        },
      });
      const editedCompanies = companies.forEach((company) => {
        delete company.password;
      });
      return {
        data: editedCompanies,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createCompany(companyInfo: createCompanyDto) {
    try {
      const company = await this.prisma.company.create({
        data: {
          ...companyInfo,
        },
      });
      delete company.password;
      return {
        messsage: 'Company created Successfully',
        data: company,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async editCompany(companyInfo: editCompanyDto) {
    try {
      const company = await this.prisma.company.update({
        where: {
          id: companyInfo.id,
        },
        data: {
          ...companyInfo,
        },
      });
      delete company.password;
      return {
        messsage: 'Company updated Successfully',
        data: company,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCompany(companyId: number) {
    try {
      const company = await this.prisma.company.delete({
        where: {
          id: companyId,
        },
      });
      delete company.password;
      return {
        message: 'Company has been deleted',
        data: company,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createCompanyBill(billInfo: createBillsDto) {
    try {
      const bill = await this.prisma.company.update({
        where: {
          id: billInfo.companyId,
        },
        data: {
          billings: {
            create: {
              amount: billInfo.amount,
              level: billInfo.level,
              status: billInfo.status,
            },
          },
        },
        include: {
          billings: true,
        },
      });
      delete bill.password;
      return {
        message: 'Bill created',
        data: bill,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateBillStatus(billId: number, status: string) {
    try {
      const bill = await this.prisma.billing.update({
        where: {
          id: billId,
        },
        data: {
          status,
        },
      });
      return {
        data: bill,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

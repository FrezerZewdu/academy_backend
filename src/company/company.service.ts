import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as argon from 'argon2';
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
            contains: filter.search,
          },
        },
      });
      companies.forEach((company) => {
        delete company.password;
      });
      return {
        data: companies,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async companyDetailById(companyId: number) {
    try {
      const company = await this.prisma.company.findUnique({
        where: {
          id: companyId,
        },
        include: {
          billings: true,
          students: true,
        },
      });
      if (company) {
        delete company.password;
        company.students.forEach((student) => {
          delete student.password;
        });
        return {
          data: company,
        };
      } else {
        return {
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createCompany(companyInfo: createCompanyDto) {
    try {
      const password = await argon.hash(companyInfo.password);
      const company = await this.prisma.company.create({
        data: {
          name: companyInfo.name,
          password,
          contactPerson: companyInfo.contactPerson,
          email: companyInfo.email,
          phoneNumber: companyInfo.phoneNumber,
        },
      });
      delete company.password;
      return {
        messsage: 'Company created Successfully',
        data: company,
      };
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ConflictException('Email already exists');
      }
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
        include: {
          billings: true,
          students: true,
        },
      });
      delete company.password;
      company.students.forEach((student) => {
        delete student.password;
      });
      return {
        messsage: 'Company updated Successfully',
        data: company,
      };
    } catch (error) {
      if (error.code == 'P2025') {
        throw new UnprocessableEntityException('Company Id does not exist');
      }
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
      if (error.code == 'P2025') {
        throw new UnprocessableEntityException('Company Id does not exist');
      }
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
      if (error.code == 'P2025') {
        throw new UnprocessableEntityException('Bill Id does not exist');
      }
      console.log(error);
    }
  }
}

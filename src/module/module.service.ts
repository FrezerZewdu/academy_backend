import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createModuleDto, editModuleDto, moduleFiltersDto } from './dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async fetchAllModules(filters: moduleFiltersDto) {
    try {
      const modules = await this.prisma.module.findMany({
        where: {
          name: {
            contains: filters.search ? filters.search : undefined,
          },
          level: filters.level ? filters.level : undefined,
          trainer: filters.trainer ? filters.trainer : undefined,
        },
      });
      return {
        data: modules,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createModule(moduleInfo: createModuleDto) {
    try {
      const module = await this.prisma.module.create({
        data: {
          ...moduleInfo,
        },
      });
      return {
        message: 'Module created',
        data: module,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async editModule(moduleInfo: editModuleDto) {
    try {
      const module = await this.prisma.module.update({
        where: {
          id: moduleInfo.id,
        },
        data: {
          ...moduleInfo,
        },
      });
      return {
        message: 'Module updated',
        data: module,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteModule(moduleId: number) {
    try {
      const module = await this.prisma.module.delete({
        where: {
          id: moduleId,
        },
      });
      return {
        message: 'Module Deleted',
        data: module,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

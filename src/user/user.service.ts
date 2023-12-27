import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { assignUserModule, updateUserDto, userFilterDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async fetchUsers(filters: userFilterDto) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          parentCompanyId: filters.companyId ? filters.companyId : undefined,
          modulesEnrolled: {
            every: {
              moduleId: filters.moduleId ? filters.moduleId : undefined,
            },
          },
          role: filters.role ? filters.role : undefined,
          OR: [
            {
              firstName: {
                contains: filters.search ? filters.search : undefined,
              },
            },
            {
              lastName: {
                contains: filters.search ? filters.search : undefined,
              },
            },
          ],
        },
      });
      const editedUsers = users.forEach((user) => {
        delete user.password;
      });
      return {
        data: editedUsers,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          parentCompany: true,
          modulesEnrolled: {
            include: {
              module: true,
            },
          },
        },
      });
      delete user.password;
      return {
        data: user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async editUser(userInfo: updateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userInfo.id,
        },
        data: {
          ...userInfo,
        },
      });
      delete user.password;
      return {
        message: 'User updated',
        data: user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async assignUserModule(assigneesInfo: assignUserModule[]) {
    try {
      const assignees = await this.prisma.module_Taken.createMany({
        data: assigneesInfo,
      });
      return {
        message: 'Modules assigned successfully',
        data: assignees,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async toogleUserActiveState(userId: number, isActive: boolean) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive,
        },
      });
      delete user.password;
      return {
        message: `User has been ${isActive ? 'Activated' : 'Deactivated'}`,
        data: user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(userId: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      delete user.password;
      return {
        message: 'User has been deleted',
        data: user,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

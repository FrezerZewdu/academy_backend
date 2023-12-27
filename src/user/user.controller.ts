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
import { UserService } from './user.service';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/dto/enums';
import { HasRoles } from 'src/auth/decorator';
import { assignUserModule, updateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.registrar, Roles.supervisor)
  fetchAllUsers(
    @Query('companyId') companyId?: number,
    @Query('moduleId') moduleId?: number,
    @Query('search') search?: string,
    @Query('role') role?: Roles,
  ) {
    return this.userService.fetchUsers({ companyId, moduleId, search, role });
  }

  @Get(':userId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.registrar, Roles.supervisor)
  fetchUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(parseInt(userId));
  }

  @Put()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.registrar, Roles.admin)
  updateUser(@Body() userInfo: updateUserDto) {
    return this.userService.editUser(userInfo);
  }

  @Post('assign-modules')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.supervisor)
  assignUserModule(@Body() assigneesInfo: assignUserModule[]) {
    return this.userService.assignUserModule(assigneesInfo);
  }

  @Put('toogle-active/:userId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin, Roles.registrar)
  toogleUserActiveStatus(
    @Param('userId') userId: string,
    @Body() isActive: boolean,
  ) {
    return this.userService.toogleUserActiveState(parseInt(userId), isActive);
  }

  @Delete(':userId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin)
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(parseInt(userId));
  }
}

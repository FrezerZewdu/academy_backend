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
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { ModuleService } from './module.service';
import { HasRoles } from 'src/auth/decorator';
import { Roles } from 'src/auth/dto/enums';
import { moduleLevels } from './dto/enums';
import { createModuleDto, editModuleDto } from './dto';

@UseGuards(JwtGuard)
@Controller('module')
export class ModuleController {
  constructor(private moduleSerivce: ModuleService) {}

  @Get()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.supervisor, Roles.admin)
  fetchAllModules(
    @Query('search') search?: string,
    @Query('level') level?: moduleLevels,
    @Query('trainer') trainer?: string,
  ) {
    if (level != undefined && !(level in moduleLevels)) {
      throw new UnprocessableEntityException(
        'Level indicated is not available',
      );
    }
    return this.moduleSerivce.fetchAllModules({ search, trainer, level });
  }

  @Post()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin)
  createModule(@Body() moduleInfo: createModuleDto) {
    return this.moduleSerivce.createModule(moduleInfo);
  }

  @Put()
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin)
  editModule(@Body() moduleInfo: editModuleDto) {
    return this.moduleSerivce.editModule(moduleInfo);
  }

  @Delete(':moduleId')
  @UseGuards(RolesGuard)
  @HasRoles(Roles.admin)
  deleteModule(@Param('moduleId') moduleId: string) {
    const moduleIdNumber = parseInt(moduleId);
    if (Number.isNaN(moduleIdNumber)) {
      throw new UnprocessableEntityException('Module Id should be a valid Id');
    }
    return this.moduleSerivce.deleteModule(parseInt(moduleId));
  }
}

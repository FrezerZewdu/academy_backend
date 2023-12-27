import { SetMetadata } from '@nestjs/common';
import { Roles } from '../dto/enums';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);

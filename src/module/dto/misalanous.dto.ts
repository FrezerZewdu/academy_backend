import { IsEnum, IsOptional } from 'class-validator';
import { moduleLevels } from './enums';

export class moduleFiltersDto {
  search?: string | null;
  @IsOptional()
  @IsEnum(moduleLevels)
  level?: moduleLevels;
  trainer?: string | null;
}

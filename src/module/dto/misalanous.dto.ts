import { moduleLevels } from './enums';

export class moduleFiltersDto {
  search?: string | null;
  level?: moduleLevels | null;
  trainer?: string | null;
}

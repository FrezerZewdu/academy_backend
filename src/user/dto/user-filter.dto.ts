import { Roles } from 'src/auth/dto/enums';

export class userFilterDto {
  companyId: number | null;
  moduleId: number | null;
  search: string | null;
  role: Roles | null;
}

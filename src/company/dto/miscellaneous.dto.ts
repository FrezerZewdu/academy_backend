import { IsNotEmpty, IsNumber } from 'class-validator';

export class companiesFilterDto {
  search?: string | null;
}

export class createBillsDto {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsNotEmpty()
  status: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class statusDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}

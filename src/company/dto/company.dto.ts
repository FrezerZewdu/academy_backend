import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class fetchCompanyDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  contactPerson: string;
}

export class createCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  contactPerson: string;
  @IsNotEmpty()
  password: string;
}

export class editCompanyDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  @IsString()
  contactPerson: string;
}

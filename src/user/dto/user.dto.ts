import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class fetchUsersDto {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  createdAt: Date;
  parentCompanyId: number;
}

export class updateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsDateString()
  @IsOptional()
  dob?: Date;

  @IsOptional()
  @IsNumber()
  parentCompanyId?: number;
}

export class assignUserModule {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  moduleId: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}

import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { moduleLevels } from './enums';

export class fetchModulesDto {
  id: number;
  name: string;
  author: string;
  level: moduleLevels;
  trainer: string;
  duration: number;
  price: number;
  isActive: boolean;
}

export class createModuleDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsEnum(moduleLevels)
  @IsNotEmpty()
  level: moduleLevels;
  @IsNotEmpty()
  @IsString()
  trainer: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;
}

export class editModuleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  @IsString()
  author?: string;
  @IsEnum(moduleLevels)
  @IsOptional()
  level?: moduleLevels;
  @IsOptional()
  @IsString()
  trainer?: string;
  @IsNumber()
  @IsOptional()
  duration?: number;
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number;
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

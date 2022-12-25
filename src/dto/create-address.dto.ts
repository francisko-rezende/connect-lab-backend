import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { BrazilianStates } from 'src/utils/brazillian-states.enum';
export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/[0-9]{5}-[\d]{3}/g, {
    message: 'CEP is invalid. It must follow this format: 00000-000.',
  })
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumber()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsNotEmpty()
  @IsEnum(BrazilianStates)
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly complement?: string;
}

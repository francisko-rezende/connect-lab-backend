import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { BrazilianStates } from 'src/utils/brazillian-states.enum';
export class CreateAddressDto {
  @ApiProperty({
    example: '20020-050',
    description: "The address' postal code",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/[0-9]{5}-[0-9]{3}/, {
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
  @IsOptional()
  readonly complement?: string;
}

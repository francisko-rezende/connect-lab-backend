import { CreateAddressDto } from './create-address.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { MatchesOtherField } from 'src/core/constraints/matches-other-field.decorator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly photoUrl: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MatchesOtherField('password', {
    message: 'confirmPassword field must match password field',
  })
  readonly confirmPassword: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
}

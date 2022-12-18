import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MatchesOtherField } from 'src/core/constraints/matches-other-field.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly photoUrl: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @MatchesOtherField('password', {
    message: 'confirmPassword field must match password field',
  })
  readonly confirmPassword: string;

  @IsString()
  @IsOptional()
  readonly phone: string;
}

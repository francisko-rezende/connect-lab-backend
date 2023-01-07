import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { MatchesOtherField } from 'src/core/constraints/matches-other-field.decorator';

export class ChangePasswordDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MatchesOtherField('newPassword', {
    message: 'confirmNewPassword field must match newPassword field',
  })
  readonly confirmNewPassword: string;
}

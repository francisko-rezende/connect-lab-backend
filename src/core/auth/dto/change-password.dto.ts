import { IsEmail, IsString, MinLength } from 'class-validator';
import { MatchesOtherField } from 'src/core/constraints/matches-other-field.decorator';

export class ChangePasswordDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly oldPassword: string;

  @IsString()
  @MinLength(8)
  readonly newPassword: string;

  @IsString()
  @MatchesOtherField('newPassword', {
    message: 'confirmNewPassword field must match newPassword field',
  })
  readonly confirmNewPassword: string;
}

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}

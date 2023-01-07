import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}

import { IsNumberString, IsOptional } from 'class-validator';
export class FindOneUserDeviceParamDto {
  @IsOptional()
  @IsNumberString()
  userDeviceId: string;
}

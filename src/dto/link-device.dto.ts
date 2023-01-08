import { IsNotEmpty, IsNumber } from 'class-validator';

export class LinkDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  deviceId: number;
}

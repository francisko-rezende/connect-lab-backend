import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LinkDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  deviceId: number;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @IsString()
  @IsNotEmpty()
  room: string;
}

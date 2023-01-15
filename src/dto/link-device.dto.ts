import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LinkDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  device: number;

  @IsNumber()
  @IsNotEmpty()
  local: number;

  @IsString()
  @IsNotEmpty()
  room: string;
}

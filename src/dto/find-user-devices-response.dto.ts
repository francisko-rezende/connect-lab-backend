import { ApiProperty } from '@nestjs/swagger';
import { DeviceInfoEntity } from '../entities/device-info.entity';
export class FindUserDevicesResponseDto {
  userDeviceId: number;
  name: string;
  type: string;
  madeBy: string;
  isOn: boolean;
  room: string;
  @ApiProperty({
    example: {
      deviceInfoId: 10,
      virtual_id: 'fdcd9824',
      ip_address: '127.0.0.1',
      mac_address: '127.0.0.1',
      signal: '-40dBm',
    },
  })
  deviceInfo: DeviceInfoEntity;
}

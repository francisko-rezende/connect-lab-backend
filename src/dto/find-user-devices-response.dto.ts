import { DeviceInfoEntity } from '../entities/device-info.entity';
export class FindUserDevicesResponseDto {
  userDeviceId: number;
  name: string;
  type: string;
  madeBy: string;
  isOn: boolean;
  room: string;
  deviceInfo: DeviceInfoEntity;
}

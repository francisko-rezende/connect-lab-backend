import { DeviceInfoEntity } from '../entities/device-info.entity';
export class FindUserDevicesResponseDto {
  name: string;
  type: string;
  madeBy: string;
  isOn: boolean;
  room: string;
  deviceInfo: DeviceInfoEntity;
}

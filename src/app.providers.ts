import { UserDeviceEntity } from './entities/user-device.entity';
import { DataSource } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';
import { UserEntity } from './entities/user.entity';
import { LocationEntity } from './entities/location.entity';

export const appProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserDeviceEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'LOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LocationEntity),
    inject: ['DATA_SOURCE'],
  },
];

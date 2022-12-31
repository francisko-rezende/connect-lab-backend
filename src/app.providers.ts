import { DataSource } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';
import { UserEntity } from './entities/user.entity';

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
];

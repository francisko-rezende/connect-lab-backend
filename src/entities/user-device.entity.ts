import { DeviceEntity } from 'src/entities/device.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity({ name: 'user_devices' })
export class UserDeviceEntity {
  @PrimaryGeneratedColumn()
  userDeviceId: number;

  @Column({ default: false })
  isOn: boolean;

  @Column()
  room: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userDevices, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => DeviceEntity, (deviceEntity) => deviceEntity.userDevices, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'device_id' })
  device: DeviceEntity;

  @ManyToOne(() => LocationEntity, (location) => location.userDevices, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;
}

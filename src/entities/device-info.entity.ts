import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { DeviceEntity } from './device.entity';

@Entity({ name: 'device_info' })
export class DeviceInfoEntity {
  @PrimaryGeneratedColumn()
  deviceInfoId: number;

  @Column()
  virtual_id: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @Column()
  signal: string;

  @OneToOne(() => DeviceEntity, (device) => device.deviceId)
  device: DeviceEntity;
}

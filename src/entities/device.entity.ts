import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceInfoEntity } from './device-info.entity';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  deviceId: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  photoUrl: string;

  @OneToOne(() => DeviceInfoEntity, (deviceInfo) => deviceInfo.deviceInfoId, {
    cascade: true,
  })
  @JoinColumn({ name: 'deviceInfoId' })
  deviceInfo: DeviceInfoEntity;
}

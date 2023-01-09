import { UserDeviceEntity } from './user-device.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'locations' })
export class LocationEntity {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column()
  description: string;

  @OneToMany(() => UserDeviceEntity, (userDevice) => userDevice.location)
  userDevices: UserDeviceEntity[];
}

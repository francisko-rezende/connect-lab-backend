import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

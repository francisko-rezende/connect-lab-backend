import { UserDeviceEntity } from './user-device.entity';
import { AddressEntity } from './address.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullName: string;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/dqd4u48y1/image/upload/v1673561527/llama_xx3coq.webp',
  })
  photoUrl: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => AddressEntity, (address) => address.addressId, {
    cascade: true,
  })
  @JoinColumn({ name: 'addressId' })
  address: AddressEntity;

  @OneToMany(() => UserDeviceEntity, (userDevice) => userDevice.user)
  userDevices: UserDeviceEntity[];

  async checkPassword(receivedPassword: string): Promise<boolean> {
    const hash = await bcrypt.hash(receivedPassword, this.salt);
    return this.password === hash;
  }
}

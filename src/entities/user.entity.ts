import { AddressEntity } from './address.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  confirmPassword: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => AddressEntity, (address) => address.addressId, {
    cascade: true,
  })
  @JoinColumn({ name: 'addressId' })
  address: AddressEntity;
}

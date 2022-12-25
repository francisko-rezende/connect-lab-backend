import { UserEntity } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  complement: string;

  @OneToOne(() => UserEntity, (user) => user.userId)
  user: UserEntity;
}

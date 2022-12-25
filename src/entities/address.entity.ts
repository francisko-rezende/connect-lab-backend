import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryColumn()
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
}

import { AddressEntity } from './../entities/address.entity';
export class FindOneUserResponseDto {
  userId: number;
  fullName: string;
  photoUrl: string;
  email: string;
  phone?: string;
  address: AddressEntity;
}

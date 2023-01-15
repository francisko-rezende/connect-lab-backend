import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './../entities/address.entity';
export class FindOneUserResponseDto {
  userId: number;
  fullName: string;
  photoUrl: string;
  email: string;
  phone?: string;
  @ApiProperty({
    example: {
      addressId: 1,
      zipCode: '36027-000',
      street: 'Rua dos bobos, número 0',
      number: 17,
      neighborhood: 'Vila Santiago',
      state: 'MG',
      city: 'Xis de Fora',
      complement: 'apto 19',
    },
  })
  address: AddressEntity;
}

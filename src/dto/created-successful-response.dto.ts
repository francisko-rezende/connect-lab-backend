import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedSuccessfulResponseDto {
  @ApiProperty({ example: '201' })
  statusCode: HttpStatus.CREATED;

  @ApiProperty({
    example:
      '"User created successfully" or "Device successfully linked to user" and so on',
  })
  message: string;
}

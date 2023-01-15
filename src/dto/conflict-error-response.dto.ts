import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictErrorResponseDto {
  @ApiProperty({ example: '409' })
  statusCode: HttpStatus.BAD_REQUEST | HttpStatus.CONFLICT;

  @ApiProperty({
    example: 'Email already registered, please use a different one',
  })
  message: string | string[];

  error: any;
}

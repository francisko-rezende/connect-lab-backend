import { ApiProperty } from '@nestjs/swagger';
export class ChangePasswordSuccessfulResponseDto {
  @ApiProperty({
    example: '200',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Password has been successfully changed',
  })
  message: string;
}

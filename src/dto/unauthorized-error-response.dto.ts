import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UnauthorizedErrorResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiPropertyOptional({ example: 'Invalid email and/or password' })
  message?: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}

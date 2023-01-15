import { ApiProperty } from '@nestjs/swagger';
export class PopulateDbSuccessfulResponseDto {
  @ApiProperty({
    example: '201',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Default devices and locations added to the database',
  })
  message: string;
}

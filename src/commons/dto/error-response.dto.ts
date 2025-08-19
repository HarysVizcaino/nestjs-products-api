import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 409, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Conflict', description: 'Error type' })
  error: string;

  @ApiProperty({
    example: 'A device with this IMEI already exists.',
    description: 'Error message',
  })
  message: string;
}

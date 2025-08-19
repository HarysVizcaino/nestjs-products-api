import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Data set based on the pagiantion limits',
  })
  data: T[];
  total: number;
}

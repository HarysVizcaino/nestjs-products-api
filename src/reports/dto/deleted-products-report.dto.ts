import { ApiProperty } from '@nestjs/swagger';

export class DeletedProductsReportDto {
  @ApiProperty({ example: 100, description: 'Total number of products' })
  total: number;

  @ApiProperty({ example: 25, description: 'Number of deleted products' })
  deleted: number;

  @ApiProperty({ example: 25.0, description: 'Percentage of deleted products' })
  percentage: number;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Report generation timestamp',
  })
  generatedAt: Date;
}

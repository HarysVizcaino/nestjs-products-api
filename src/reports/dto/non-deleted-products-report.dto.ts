import { ApiProperty } from '@nestjs/swagger';

export class NonDeletedProductsReportDto {
  @ApiProperty({
    example: 75,
    description: 'Count of products matching criteria',
  })
  count: number;

  @ApiProperty({ example: 75, description: 'Total non-deleted products' })
  total: number;

  @ApiProperty({
    example: 100.0,
    description: 'Percentage of products matching criteria',
  })
  percentage: number;

  @ApiProperty({ example: { withPrice: true }, description: 'Applied filters' })
  filters: {
    withPrice?: boolean;
    dateRange?: {
      start: string;
      end: string;
    };
  };

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Report generation timestamp',
  })
  generatedAt: Date;
}

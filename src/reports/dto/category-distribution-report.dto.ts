import { ApiProperty } from '@nestjs/swagger';
import { CategoryDistributionDto } from './category-distribution.dto';

export class CategoryDistributionReportDto {
  @ApiProperty({
    type: [CategoryDistributionDto],
    description: 'Distribution of products by category',
  })
  distribution: CategoryDistributionDto[];

  @ApiProperty({ example: 99, description: 'Total number of active products' })
  totalProducts: number;

  @ApiProperty({ example: 5, description: 'Number of unique categories' })
  uniqueCategories: number;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Report generation timestamp',
  })
  generatedAt: Date;
}

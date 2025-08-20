import { ApiProperty } from '@nestjs/swagger';

export class CategoryDistributionDto {
  @ApiProperty({ example: 'electronics', description: 'Category name' })
  category: string;

  @ApiProperty({ example: 45, description: 'Number of products in category' })
  count: number;

  @ApiProperty({ example: 45.5, description: 'Percentage of total products' })
  percentage: number;
}

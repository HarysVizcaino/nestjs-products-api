import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductCategory } from 'src/helpers/enums/product-category.enum';

export class FilterProductDto {
  @ApiPropertyOptional({
    description: 'Filter by product id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({
    description: 'Filter by product name (partial match)',
    example: 'iPhone',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by product category',
    example: 'electronics',
    enum: ProductCategory,
  })
  @IsOptional()
  @IsString()
  @IsEnum(ProductCategory)
  category?: string;

  @ApiPropertyOptional({
    description: 'Minimum price filter',
    example: 10.99,
    minimum: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price filter',
    example: 999.99,
    minimum: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}

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
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({
    description: 'Filter by product name (partial match)',
    required: false,
    nullable: true,
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
    minimum: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price filter',
    minimum: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}

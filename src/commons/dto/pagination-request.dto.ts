import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationRequestDto {
  @ApiProperty({
    default: 1,
    description: 'which page of data are you requesting',
    required: false,
    minimum: 1,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @ApiProperty({
    default: 10,
    description: 'How many items are you requesting',
    required: false,
    maximum: 50,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}

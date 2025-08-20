import { CustomReportType } from 'src/helpers/enums/custom-report-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';

export class CustomReportQueryDto {
  @ApiProperty({
    name: 'reportType',
    required: false,
    description: 'Type of custom report',
    enum: CustomReportType,
    example: CustomReportType.TOP_CATEGORIES,
  })
  @IsOptional()
  @IsEnum(CustomReportType)
  reportType?: CustomReportType = CustomReportType.TOP_CATEGORIES;
}

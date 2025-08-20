import {
  Controller,
  Get,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeletedProductsReportDto } from './dto/deleted-products-report.dto';
import { apiResponse } from 'src/helpers/enums/api-response.enum';
import { NonDeletedProductsFilterDto } from './dto/non-deleted-products-filter.dto';
import { NonDeletedProductsReportDto } from './dto/non-deleted-products-report.dto';
import { CategoryDistributionReportDto } from './dto/category-distribution-report.dto';
import { CustomReportType } from 'src/helpers/enums/custom-report-type.enum';
import { CustomReportQueryDto } from './dto/custom-report-query.dto';

@ApiTags('Reports')
@Controller('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Get deleted products percentage' })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: DeletedProductsReportDto,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
    type: BadRequestException,
  })
  @Get('deleted-products-percentage')
  async getDeletedProductsPercentage(): Promise<DeletedProductsReportDto> {
    const report = await this.reportsService.getDeletedProductsPercentage();
    return {
      ...report,
      generatedAt: new Date(),
    };
  }

  @ApiOperation({ summary: 'Get non-deleted products percentage' })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: NonDeletedProductsReportDto,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
    type: BadRequestException,
  })
  @Get('non-deleted-products-percentage')
  async getNonDeletedProductsPercentage(
    @Query() filters: NonDeletedProductsFilterDto,
  ): Promise<NonDeletedProductsReportDto> {
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      if (startDate > endDate) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    const report = await this.reportsService.getNonDeletedProductsStats(
      filters.withPrice,
      filters.startDate ? new Date(filters.startDate) : undefined,
      filters.endDate ? new Date(filters.endDate) : undefined,
    );

    const appliedFilters: any = {};
    if (filters.withPrice !== undefined) {
      appliedFilters.withPrice = filters.withPrice;
    }
    if (filters.startDate && filters.endDate) {
      appliedFilters.dateRange = {
        start: filters.startDate,
        end: filters.endDate,
      };
    }

    return {
      ...report,
      filters: appliedFilters,
      generatedAt: new Date(),
    };
  }

  @ApiOperation({ summary: 'Get category distribution' })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: CategoryDistributionReportDto,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
    type: BadRequestException,
  })
  @Get('category-distribution')
  async getCategoryDistribution(): Promise<CategoryDistributionReportDto> {
    const distribution = await this.reportsService.getCategoryDistribution();

    const totalProducts = distribution.reduce(
      (sum, item) => sum + parseInt(item.count),
      0,
    );

    const distributionWithPercentage = distribution.map((item) => ({
      category: item.category || 'Uncategorized',
      count: parseInt(item.count),
      percentage:
        totalProducts > 0 ? (parseInt(item.count) / totalProducts) * 100 : 0,
    }));

    return {
      distribution: distributionWithPercentage,
      totalProducts,
      uniqueCategories: distribution.length,
      generatedAt: new Date(),
    };
  }

  @ApiOperation({
    summary: 'Get custom reports',
    description: 'Additional custom reports with various insights',
  })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: Object,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
    type: BadRequestException,
  })
  @Get('custom')
  async getCustomReport(@Query() query: CustomReportQueryDto): Promise<any> {
    switch (query.reportType) {
      case CustomReportType.PRICE_RANGE_DISTRIBUTION:
        return this.reportsService.getPriceRangeDistribution();

      case CustomReportType.PRODUCTS_BY_MONTH:
        return this.reportsService.getProductsByMonth();

      case CustomReportType.TOP_CATEGORIES:
      default:
        return this.reportsService.getTopCategories();
    }
  }

  @ApiOperation({ summary: 'Get reports summary' })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: Object,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
    type: BadRequestException,
  })
  @Get('summary')
  async getReportsSummary(): Promise<any> {
    const [deletedReport, categoryReport] = await Promise.all([
      this.reportsService.getDeletedProductsPercentage(),
      this.reportsService.getCategoryDistribution(),
    ]);

    const totalProducts = deletedReport.total;
    const activeProducts = totalProducts - deletedReport.deleted;

    return {
      overview: {
        totalProducts,
        activeProducts,
        deletedProducts: deletedReport.deleted,
        deletionRate: deletedReport.percentage,
      },
      categories: {
        total: categoryReport.length,
        distribution: categoryReport.slice(0, 5),
      },
      generatedAt: new Date(),
    };
  }
}

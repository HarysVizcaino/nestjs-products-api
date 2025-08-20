import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async getDeletedProductsPercentage() {
    return this.reportsRepository.getDeletedProductsPercentage();
  }

  async getNonDeletedProductsStats(
    withPrice?: boolean,
    startDate?: Date,
    endDate?: Date,
  ) {
    return this.reportsRepository.getNonDeletedProductsStats(
      withPrice,
      startDate,
      endDate,
    );
  }

  async getCategoryDistribution() {
    return this.reportsRepository.getCategoryDistribution();
  }

  async getPriceRangeDistribution() {
    return this.reportsRepository.getPriceRangeDistribution();
  }

  async getProductsByMonth() {
    return this.reportsRepository.getProductsByMonth();
  }

  async getTopCategories() {
    return this.reportsRepository.getTopCategories();
  }
}

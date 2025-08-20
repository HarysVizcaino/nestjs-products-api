import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ReportsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getDeletedProductsPercentage() {
    const total = await this.productRepository.count();
    const deleted = await this.productRepository.count({
      where: { isDeleted: true },
    });

    return {
      total,
      deleted,
      percentage: total > 0 ? (deleted / total) * 100 : 0,
    };
  }

  async getNonDeletedProductsStats(
    withPrice?: boolean,
    startDate?: Date,
    endDate?: Date,
  ) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.isDeleted = :isDeleted', { isDeleted: false });

    if (withPrice !== undefined) {
      if (withPrice) {
        query.andWhere('product.price IS NOT NULL');
      } else {
        query.andWhere('product.price IS NULL');
      }
    }

    if (startDate && endDate) {
      query.andWhere('product.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const count = await query.getCount();
    const total = await this.productRepository.count({
      where: { isDeleted: false },
    });

    return {
      count,
      total,
      percentage: total > 0 ? (count / total) * 100 : 0,
    };
  }

  async getCategoryDistribution() {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select('product.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('product.isDeleted = :isDeleted', { isDeleted: false })
      .groupBy('product.category')
      .getRawMany();

    return result;
  }

  async getPriceRangeDistribution() {
    return this.productRepository.find();
  }

  async getProductsByMonth() {
    return this.productRepository.find();
  }

  async getTopCategories() {
    return this.productRepository.find();
  }
}

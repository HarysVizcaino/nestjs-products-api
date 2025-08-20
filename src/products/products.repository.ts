import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationRequestDto } from 'src/commons/dto/pagination-request.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { PaginatedResponseDto } from 'src/commons/dto/paginated-response.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findByContentfulId(contentfulId: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { contentfulId },
    });
  }

  async findAll(
    paginationDto: PaginationRequestDto,
    filterDto: FilterProductDto,
  ): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 5 } = paginationDto;
    const query = this.productRepository.createQueryBuilder('product');

    // Apply filters
    query.where('product.isDeleted = :isDeleted', { isDeleted: false });

    if (filterDto.id) {
      query.andWhere('product.id = :id', { id: filterDto.id });
    }

    if (filterDto.name) {
      query.andWhere('product.name ILIKE :name', {
        name: `%${filterDto.name}%`,
      });
    }

    if (filterDto.category) {
      query.andWhere('product.category = :category', {
        category: filterDto.category,
      });
    }

    if (filterDto.minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', {
        minPrice: filterDto.minPrice,
      });
    }

    if (filterDto.maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', {
        maxPrice: filterDto.maxPrice,
      });
    }

    // Apply pagination
    query.skip((page - 1) * limit).take(limit);

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async findProductById(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return this.productRepository.save({ ...product, id });
  }

  async remove(id: string) {
    await this.productRepository.update(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ContentfulProduct } from 'src/contentful/entities/contentful.entity';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dto/filter-product.dto';
import { PaginationRequestDto } from 'src/commons/dto/pagination-request.dto';
import { PaginatedResponseDto } from 'src/commons/dto/paginated-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async syncProducts(contentfulProducts: ContentfulProduct[]) {
    for (const contentfulProduct of contentfulProducts) {
      const existingProduct = await this.productsRepository.findByContentfulId(
        contentfulProduct.contentfulId,
      );

      if (existingProduct && !existingProduct.isDeleted) {
        const product = new Product();
        product.contentfulId = contentfulProduct.contentfulId;
        product.name = contentfulProduct.name;
        product.category = contentfulProduct.category;
        product.price = contentfulProduct.price;
        product.description = contentfulProduct.description;

        await this.productsRepository.updateProduct(
          existingProduct.id,
          product,
        );
      } else if (!existingProduct) {
        const product = new Product();
        product.contentfulId = contentfulProduct.contentfulId;
        product.name = contentfulProduct.name;
        product.category = contentfulProduct.category;
        product.price = contentfulProduct.price;
        product.description = contentfulProduct.description;

        await this.productsRepository.createProduct(product);
      }
    }
  }

  async findAll(
    paginationDto: PaginationRequestDto,
    filterDto: FilterProductDto,
  ): Promise<PaginatedResponseDto<ProductResponseDto>> {
    const products = await this.productsRepository.findAll(
      paginationDto,
      filterDto,
    );
    return new PaginatedResponseDto(
      products.items.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
      })),
      products.meta.total,
      products.meta.page,
      products.meta.limit,
    );
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
    };
  }
}

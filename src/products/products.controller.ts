import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { FilterProductDto } from './dto/filter-product.dto';
import { PaginationRequestDto } from 'src/commons/dto/pagination-request.dto';
import { PaginatedResponseDto } from 'src/commons/dto/paginated-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { roleEnum } from 'src/helpers/enums/roles.enum';
import { apiResponse } from 'src/helpers/enums/api-response.enum';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    description: `List of products with pagination.
    <br><br/>
    Allowed Roles: [
    ${roleEnum.ADMIN}
    ]
    `,
  })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: [ProductResponseDto],
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query() paginationDto: PaginationRequestDto,
    @Query() filterDto: FilterProductDto,
  ): Promise<PaginatedResponseDto<ProductResponseDto>> {
    return this.productsService.findAll(paginationDto, filterDto);
  }

  @ApiOperation({
    description: `Get product by Id.
    <br><br/>
    Allowed Roles: [
    ${roleEnum.ADMIN}
    ]
    `,
  })
  @ApiOkResponse({
    description: apiResponse.OK,
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiNotFoundResponse({
    description: apiResponse.NOT_FOUND,
    type: NotFoundException,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    if (!id) {
      throw new BadRequestException('ID must be a positive integer');
    }
    return this.productsService.findOne(id);
  }

  @ApiOperation({
    description: `Delete product by Id.
    <br><br/>
    Allowed Roles: [
    ${roleEnum.ADMIN}
    ]
    `,
  })
  @ApiOkResponse({
    description: apiResponse.DELETED,
  })
  @ApiBadRequestResponse({
    description: apiResponse.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: apiResponse.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiNotFoundResponse({
    description: apiResponse.NOT_FOUND,
    type: NotFoundException,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestException('ID must be a positive integer');
    }
    await this.productsService.remove(id);

    return {
      message: apiResponse.DELETED,
    };
  }
}

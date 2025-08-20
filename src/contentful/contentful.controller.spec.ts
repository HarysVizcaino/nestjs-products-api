import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulController } from './contentful.controller';
import { ContentfulService } from './contentful.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from 'src/products/products.service';

describe('ContentfulController', () => {
  let controller: ContentfulController;

  const mockContentfulService = {
    getContentfulData: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-secret'),
  };

  const mockProductsService = {
    syncProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentfulController],
      providers: [
        ContentfulService,
        {
          provide: ContentfulService,
          useValue: mockContentfulService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ContentfulController>(ContentfulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

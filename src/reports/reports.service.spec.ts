import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';

describe('ReportsService', () => {
  let service: ReportsService;

  const mockReportsService = {
    getDeletedProductsPercentage: jest.fn(),
    getNonDeletedProductsStats: jest.fn(),
    getCategoryDistribution: jest.fn(),
    getCustomReport: jest.fn(),
  };

  const mockReportsRepository = {
    getDeletedProductsPercentage: jest.fn(),
    getNonDeletedProductsStats: jest.fn(),
    getCategoryDistribution: jest.fn(),
    getCustomReport: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: ReportsRepository,
          useValue: mockReportsRepository,
        },
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

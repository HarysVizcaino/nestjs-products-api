import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { UsersService } from 'src/users/users.service';

describe('SeedService', () => {
  let service: SeedService;

  const mockUsersService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

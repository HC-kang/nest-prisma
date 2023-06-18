import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { PrismaService } from '@prismaModule/prisma.service';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let mockPrismaService: Partial<PrismaService>;

  beforeEach(async () => {
    mockPrismaService = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    mockPrismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

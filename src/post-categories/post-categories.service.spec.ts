import { Test, TestingModule } from '@nestjs/testing';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesRepository } from './post-categories.repository';

describe('PostCategoriesService', () => {
  let service: PostCategoriesService;
  let mockPostCategoriesRepository: Partial<PostCategoriesRepository>;

  beforeEach(async () => {
    mockPostCategoriesRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCategoriesService,
        {
          provide: PostCategoriesRepository,
          useValue: mockPostCategoriesRepository,
        },
      ],
    }).compile();

    service = module.get<PostCategoriesService>(PostCategoriesService);
    mockPostCategoriesRepository = module.get<PostCategoriesRepository>(
      PostCategoriesRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

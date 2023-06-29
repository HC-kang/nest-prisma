import { Test, TestingModule } from '@nestjs/testing';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesService } from './post-categories.service';

describe('PostCategoriesController', () => {
  let controller: PostCategoriesController;
  let mockPostCategoriesService: Partial<PostCategoriesService>;

  beforeEach(async () => {
    mockPostCategoriesService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCategoriesController],
      providers: [
        {
          provide: PostCategoriesService,
          useValue: mockPostCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<PostCategoriesController>(PostCategoriesController);
    mockPostCategoriesService = module.get<PostCategoriesService>(
      PostCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

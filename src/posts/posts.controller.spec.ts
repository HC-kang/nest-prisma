import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let mockPostsService: Partial<PostsService>;

  beforeEach(async () => {
    mockPostsService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    mockPostsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

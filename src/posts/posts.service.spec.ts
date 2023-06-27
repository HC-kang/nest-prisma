import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

describe('PostsService', () => {
  let service: PostsService;
  let mockPostsRepository: Partial<PostsRepository>;

  beforeEach(async () => {
    mockPostsRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: mockPostsRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    mockPostsRepository = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

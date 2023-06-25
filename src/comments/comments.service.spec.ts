import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';

describe('CommentsService', () => {
  let service: CommentsService;
  let mockCommentsRepository: Partial<CommentsRepository>;

  beforeEach(async () => {
    mockCommentsRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentsRepository,
          useValue: mockCommentsRepository,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    mockCommentsRepository = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

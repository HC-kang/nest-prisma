import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository: Partial<UsersService>;

  beforeEach(async () => {
    mockUsersRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUsersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

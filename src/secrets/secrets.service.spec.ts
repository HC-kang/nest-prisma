import { Test, TestingModule } from '@nestjs/testing';
import { SecretsService } from './secrets.service';
import { SecretsRepository } from './secrets.repository';

describe('SecretsService', () => {
  let service: SecretsService;
  let mockSecretsRepository: Partial<SecretsRepository>;

  beforeEach(async () => {
    mockSecretsRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretsService,
        {
          provide: SecretsRepository,
          useValue: mockSecretsRepository,
        },
      ],
    }).compile();

    service = module.get<SecretsService>(SecretsService);
    mockSecretsRepository = module.get<SecretsRepository>(SecretsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

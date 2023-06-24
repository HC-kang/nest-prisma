import { Test, TestingModule } from '@nestjs/testing';
import { SecretsService } from './secrets.service';
import { SecretsRepository } from './secrets.repository';
import { CreateSecretDto } from './dto/create-secret.dto';
import { Secret } from '@prisma/client';
import { UniqueTokenGeneratorService } from '@src/util/unique-token-generator.service';

describe('SecretsService', () => {
  let service: SecretsService;
  let mockSecretsRepository: Partial<SecretsRepository>;
  let mockTokenGenerator: Partial<UniqueTokenGeneratorService>;

  beforeEach(async () => {
    mockSecretsRepository = {};
    mockTokenGenerator = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretsService,
        {
          provide: SecretsRepository,
          useValue: mockSecretsRepository,
        },
        {
          provide: UniqueTokenGeneratorService,
          useValue: mockTokenGenerator,
        },
      ],
    }).compile();

    service = module.get<SecretsService>(SecretsService);
    mockSecretsRepository = module.get<SecretsRepository>(SecretsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a secret', () => {
    const testSecret = 'testSecret';
    const createSecretDto: CreateSecretDto = {
      urlId: 'testUrlId',
      secret: 'testSecret',
    };
    const secret: Secret = {
      id: 1,
      ...createSecretDto,
    };
    mockSecretsRepository.create = jest.fn().mockResolvedValue(secret);
    mockTokenGenerator.generateToken = jest.fn().mockReturnValue(testSecret);

    expect(service.create(createSecretDto));
    expect(mockSecretsRepository.create).toBeCalledWith(createSecretDto);
    expect(mockSecretsRepository.create).toBeCalledTimes(1);
    expect(mockTokenGenerator.generateToken).toBeCalledTimes(1);
  });
});

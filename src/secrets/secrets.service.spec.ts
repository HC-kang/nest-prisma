import { Test, TestingModule } from '@nestjs/testing';
import { SecretsService } from './secrets.service';
import { SecretsRepository } from './secrets.repository';
import { CreateSecretDto } from './dto/create-secret.dto';
import { UniqueTokenGeneratorService } from '@src/util/unique-token-generator.service';
import { CreateSecretRequestDto } from './dto/create-secret-request.dto';
import { SecretEntity } from './entities/secret.entity';

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

  it('should create a secret', async () => {
    // Arrange
    const testSecret = 'test-secret';
    const testUrlId = 'test-url-id';
    const createSecretRequestDto: CreateSecretRequestDto = {
      secret: testSecret,
    };
    const createSecretDto: CreateSecretDto = {
      ...createSecretRequestDto,
      urlId: testUrlId,
    };
    const secretEntity: SecretEntity = {
      ...createSecretDto,
      id: 1,
    };
    mockSecretsRepository.create = jest.fn().mockResolvedValue(secretEntity);
    mockTokenGenerator.generateToken = jest.fn().mockReturnValue(testUrlId);

    // Act
    const result = await service.create(createSecretRequestDto);

    // Assert
    expect(result).toEqual(secretEntity);
    expect(mockSecretsRepository.create).toBeCalledWith(createSecretDto);
    expect(mockSecretsRepository.create).toBeCalledTimes(1);
    expect(mockTokenGenerator.generateToken).toBeCalledTimes(1);
  });
});

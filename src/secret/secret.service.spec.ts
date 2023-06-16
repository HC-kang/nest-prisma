import { Test, TestingModule } from '@nestjs/testing';
import { SecretService } from './secret.service';
import { SecretValidator } from './secret.validator';
import { SecretRepository } from './secret.repository';
import { GetSecretParam } from './dto/get_secret.dto';
import { Secret } from '@prisma/client';
import { DeleteSecretParam } from './dto/delete_secret.dto';
import { UniqueTokenGeneratorService } from '@src/util/unique-token-generator.service';
import { UserCreateSecretBody } from './dto/user_create_secret.dto';

const MOCK_UNIQUE_TOKEN = 'generatedUniqueToken';
describe('SecretService', () => {
  let secretService: SecretService;
  let secretValidator: SecretValidator;
  let mockSecretRepository: Partial<SecretRepository>;
  let mockUniqueTokenGeneratorService: UniqueTokenGeneratorService;

  beforeEach(async () => {
    mockSecretRepository = {};
    mockUniqueTokenGeneratorService = {
      generateToken: jest.fn().mockReturnValue(MOCK_UNIQUE_TOKEN),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretService,
        SecretValidator,
        {
          provide: SecretRepository,
          useValue: mockSecretRepository,
        },
        {
          provide: UniqueTokenGeneratorService,
          useValue: mockUniqueTokenGeneratorService,
        },
      ],
    }).compile();

    secretService = module.get<SecretService>(SecretService);
    secretValidator = module.get<SecretValidator>(SecretValidator);
    mockSecretRepository = module.get<SecretRepository>(SecretRepository);
  });

  it('should be defined', () => {
    expect(secretService).toBeDefined();
  });

  describe('getSecret Test', () => {
    it('should return a secret when it is found', async () => {
      // Arrange
      const param: GetSecretParam = {
        urlId: '123456qwerty',
      };
      const mockSecret: Secret = {
        urlId: '123456qwerty',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        secret: 'myValidSecret',
      };
      const secretFindUniqueOrThrowArgs = secretValidator.getSecretValidator(param);
      mockSecretRepository.getSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretService.getSecret(param);

      // Assert
      expect(result).toEqual(mockSecret.secret);
      expect(mockSecretRepository.getSecret).toBeCalledTimes(1);
      expect(mockSecretRepository.getSecret).toBeCalledWith(
        secretFindUniqueOrThrowArgs,
      );
    });
  });

  describe('createSecret Test', () => {
    it('should create and return a urlId', async () => {
      // Arrange
      const mockBody: UserCreateSecretBody = {
        secret: 'myValidSecret',
      };
      const mockSecret: Secret = {
        urlId: MOCK_UNIQUE_TOKEN,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        secret: 'myValidSecret',
      };
      const secretCreateArgs = secretValidator.createSecretValidator({
        urlId: MOCK_UNIQUE_TOKEN,
        ...mockBody,
      });
      mockSecretRepository.createSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretService.createSecret(mockBody);

      // Assert
      expect(result).toEqual(mockSecret.urlId);
      expect(mockSecretRepository.createSecret).toBeCalledTimes(1);
      expect(mockSecretRepository.createSecret).toBeCalledWith(
        secretCreateArgs,
      );
    });
  });

  describe('deleteSecret Test', () => {
    it('should delete and return a secret', async () => {
      // Arrange
      const param: DeleteSecretParam = {
        urlId: '123456qwerty',
      };
      const mockSecret: Secret = {
        urlId: '123456qwerty',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        secret: 'myValidSecret',
      };
      const secretDeleteInput = secretValidator.deleteSecretValidator(param);
      mockSecretRepository.deleteSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretService.deleteSecret(param);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(mockSecretRepository.deleteSecret).toBeCalledTimes(1);
      expect(mockSecretRepository.deleteSecret).toBeCalledWith(
        secretDeleteInput,
      );
    });
  });
});

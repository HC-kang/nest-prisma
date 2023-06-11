import { Test, TestingModule } from '@nestjs/testing';
import { SecretService } from './secret.service';
import { SecretValidator } from './secret.validator';
import { SecretRepository } from './secret.repository';
import { GetSecretParam } from './dto/get_secret.dto';
import { Secret } from '@prisma/client';
import { CreateSecretBody } from './dto/create_secret.dto';
import { DeleteSecretParam } from './dto/delete_secret.dto';

describe('SecretService', () => {
  let secretService: SecretService;
  let secretValidator: SecretValidator;
  let mockSecretRepository: Partial<SecretRepository>;

  beforeEach(async () => {
    mockSecretRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretService,
        SecretValidator,
        {
          provide: SecretRepository,
          useValue: mockSecretRepository,
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
    it('should return a secret', async () => {
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
      const secretFindUniqueArgs = secretValidator.getSecretValidator(param);
      mockSecretRepository.getSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretService.getSecret(param);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(mockSecretRepository.getSecret).toBeCalledTimes(1);
      expect(mockSecretRepository.getSecret).toBeCalledWith(
        secretFindUniqueArgs,
      );
    });
  });

  describe('createSecret Test', () => {
    it('should create and return a secret', async () => {
      // Arrange
      const mockBody: CreateSecretBody = {
        urlId: '123456qwerty',
        secret: 'myValidSecret',
      };
      const mockSecret: Secret = {
        urlId: '123456qwerty',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        secret: 'myValidSecret',
      };
      const secretCreateArgs = secretValidator.createSecretValidator(mockBody);
      mockSecretRepository.createSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretService.createSecret(mockBody);

      // Assert
      expect(result).toEqual(mockSecret);
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

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@prismaModule/prisma.service';
import { SecretRepository } from './secret.repository';
import { SecretValidator } from './secret.validator';
import { GetSecretParam } from './dto/get_secret.dto';
import { Secret } from '@prisma/client';
import { CreateSecretBody } from './dto/create_secret.dto';
import { DeleteSecretParam } from './dto/delete_secret.dto';

describe('SecretRepository', () => {
  let secretRepository: SecretRepository;
  let secretValidator: SecretValidator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretRepository, SecretValidator, PrismaService],
    }).compile();

    secretRepository = module.get<SecretRepository>(SecretRepository);
    secretValidator = module.get<SecretValidator>(SecretValidator);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(secretRepository).toBeDefined();
  });

  describe('getSecret', () => {
    it('should return a secret', async () => {
      // Arrange
      const param: GetSecretParam = { urlId: '123456qwerty' };
      const mockSecret: Secret = {
        urlId: '123456qwerty',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        secret: 'myValidSecret',
      };
      const secretFindUniqueArgs = secretValidator.getSecretValidator(param);
      prismaService.secret.findUnique = jest.fn().mockResolvedValue(mockSecret);

      // Act
      const result = await secretRepository.getSecret(secretFindUniqueArgs);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(prismaService.secret.findUnique).toBeCalledTimes(1);
      expect(prismaService.secret.findUnique).toBeCalledWith(
        secretFindUniqueArgs,
      );
    });
  });

  describe('createSecret', () => {
    it('should create a secret', async () => {
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
      prismaService.secret.create = jest.fn().mockResolvedValue(mockSecret);

      // Act
      const result = await secretRepository.createSecret(secretCreateArgs);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(prismaService.secret.create).toBeCalledTimes(1);
      expect(prismaService.secret.create).toBeCalledWith({
        data: secretCreateArgs,
      });
    });
  });

  describe('deleteSecret', () => {
    it('should delete a secret', async () => {
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
      prismaService.secret.update = jest.fn().mockResolvedValue(mockSecret);

      // Act
      const result = await secretRepository.deleteSecret(secretDeleteInput);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(prismaService.secret.update).toBeCalledTimes(1);
      expect(prismaService.secret.update).toBeCalledWith(secretDeleteInput);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SecretController } from './secret.controller';
import { SecretService } from './secret.service';
import { GetSecretParam } from './dto/get_secret.dto';
import { Secret } from '@prisma/client';
import { CreateSecretBody } from './dto/create_secret.dto';
import { DeleteSecretParam } from './dto/delete_secret.dto';

describe('SecretController', () => {
  let secretController: SecretController;
  let mockSecretService: Partial<SecretService>;

  beforeEach(async () => {
    mockSecretService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretController],
      providers: [
        {
          provide: SecretService,
          useValue: mockSecretService,
        },
      ],
    }).compile();

    secretController = module.get<SecretController>(SecretController);
    mockSecretService = module.get<SecretService>(SecretService);
  });

  it('should be defined', () => {
    expect(secretController).toBeDefined();
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
      mockSecretService.getSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretController.getSecret(param);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(mockSecretService.getSecret).toBeCalledTimes(1);
      expect(mockSecretService.getSecret).toBeCalledWith(param);
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
      mockSecretService.createSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretController.createSecret(mockBody);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(mockSecretService.createSecret).toBeCalledTimes(1);
      expect(mockSecretService.createSecret).toBeCalledWith(mockBody);
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
      mockSecretService.deleteSecret = jest.fn().mockReturnValue(mockSecret);

      // Act
      const result = await secretController.deleteSecret(param);

      // Assert
      expect(result).toEqual(mockSecret);
      expect(mockSecretService.deleteSecret).toBeCalledTimes(1);
      expect(mockSecretService.deleteSecret).toBeCalledWith(param);
    });
  });
});

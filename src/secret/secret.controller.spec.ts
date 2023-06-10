import { Test, TestingModule } from '@nestjs/testing';
import { SecretController } from './secret.controller';
import { SecretService } from './secret.service';

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
    // it('should return a secret', () => {
    //   // Arrange
    //   const mockSecret = 'test';
    //   mockSecretService.getSecret = jest.fn().mockResolvedValue(mockSecret);

    //   // Act
    //   const result = secretController.getSecret();

    //   // Assert
    //   expect(result).toEqual(mockSecret);
    //   expect(mockSecretService.getSecret).toBeCalledTimes(1);
    //   // expect(mockSecretService.getSecret).toBeCalledWith();
    // });
  });
});

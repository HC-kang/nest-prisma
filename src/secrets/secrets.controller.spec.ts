import { Test, TestingModule } from '@nestjs/testing';
import { SecretsController } from './secrets.controller';
import { SecretsService } from './secrets.service';

describe('SecretsController', () => {
  let controller: SecretsController;
  let mockSecretsService: Partial<SecretsService>;

  beforeEach(async () => {
    mockSecretsService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretsController],
      providers: [
        {
          provide: SecretsService,
          useValue: mockSecretsService,
        },
      ],
    }).compile();

    controller = module.get<SecretsController>(SecretsController);
    mockSecretsService = module.get<SecretsService>(SecretsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

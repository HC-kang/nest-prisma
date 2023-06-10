import { Test, TestingModule } from '@nestjs/testing';
import { SecretValidator } from './secret.validator';

describe('SecretValidator', () => {
  let secretValidator: SecretValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretValidator],
    }).compile();

    secretValidator = module.get<SecretValidator>(SecretValidator);
  });

  it('should be defined', () => {
    expect(secretValidator).toBeDefined();
  });
});

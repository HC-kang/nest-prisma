import { Test, TestingModule } from '@nestjs/testing';
import { UserValidator } from './user.validator';

describe('UserValidator', () => {
  let userValidator: UserValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserValidator],
    }).compile();

    userValidator = module.get<UserValidator>(UserValidator);
  });

  it('should be defined', () => {
    expect(userValidator).toBeDefined();
  });
});

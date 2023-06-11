import { Test, TestingModule } from '@nestjs/testing';
import { UniqueTokenGeneratorService } from './unique-token-generator.service';

describe('UniqueTokenGeneratorService', () => {
  let service: UniqueTokenGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueTokenGeneratorService],
    }).compile();

    service = module.get<UniqueTokenGeneratorService>(UniqueTokenGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

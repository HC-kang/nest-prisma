import { Test, TestingModule } from '@nestjs/testing';
import { UniqueTokenGeneratorService } from './unique-token-generator.service';

describe('UniqueTokenGeneratorService', () => {
  let service: UniqueTokenGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueTokenGeneratorService],
    }).compile();

    service = module.get<UniqueTokenGeneratorService>(
      UniqueTokenGeneratorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create valid secret', () => {
    expect(service.generateToken().length).toEqual(20);
  });

  it('should create different secrets for each calling', () => {
    const secretSet = new Set();
    const sizeOfSet = 1000;
    for (let i = 0; i < sizeOfSet; i++) {
      secretSet.add(service.generateToken());
    }
    expect(secretSet.size).toEqual(sizeOfSet);
  });
});

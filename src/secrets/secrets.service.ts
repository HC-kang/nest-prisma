import { Injectable } from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { SecretsRepository } from './secrets.repository';
import { UniqueTokenGeneratorService } from '@src/util/unique-token-generator.service';

@Injectable()
export class SecretsService {
  constructor(
    private readonly secretsRepository: SecretsRepository,
    private readonly tokenGenerator: UniqueTokenGeneratorService,
  ) {}

  create(createSecretDto: CreateSecretDto) {
    createSecretDto.urlId = this.tokenGenerator.generateToken();
    return this.secretsRepository.create(createSecretDto);
  }

  async findAll() {
    return await this.secretsRepository.findAll();
  }

  async findOne(urlId: string) {
    const secret = this.secretsRepository.findOne(urlId);
    await this.remove((await secret).urlId);
    return secret;
  }

  private async remove(urlId: string) {
    return await this.secretsRepository.remove(urlId);
  }
}

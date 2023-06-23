import { Injectable } from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { SecretsRepository } from './secrets.repository';

@Injectable()
export class SecretsService {
  constructor(private readonly secretsRepository: SecretsRepository) {}

  create(createSecretDto: CreateSecretDto) {
    createSecretDto.urlId = 'qwerty123456';
    return this.secretsRepository.create(createSecretDto);
  }

  findAll() {
    return this.secretsRepository.findAll();
  }

  findOne(id: number) {
    return this.secretsRepository.findOne(id);
  }

  remove(id: number) {
    return this.secretsRepository.remove(id);
  }
}

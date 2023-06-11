import { Injectable } from '@nestjs/common';
import { SecretRepository } from './secret.repository';
import { SecretValidator } from './secret.validator';
import { Secret } from '@prisma/client';
import { GetSecretParam } from './dto/get_secret.dto';
import { CreateSecretBody } from './dto/create_secret.dto';

@Injectable()
export class SecretService {
  constructor(
    private secretRepository: SecretRepository,
    private secretValidator: SecretValidator,
  ) {}

  async getSecret(param: GetSecretParam): Promise<Secret> {
    return await this.secretRepository.getSecret(
      this.secretValidator.getSecretValidator(param),
    );
  }

  async createSecret(body: CreateSecretBody): Promise<Secret> {
    return await this.secretRepository.createSecret(
      this.secretValidator.createSecretValidator(body),
    );
  }

  async deleteSecret(param: GetSecretParam): Promise<Secret> {
    return await this.secretRepository.deleteSecret(
      this.secretValidator.deleteSecretValidator(param),
    );
  }
}

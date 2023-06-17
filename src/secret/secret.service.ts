import { Injectable, NotFoundException } from '@nestjs/common';
import { SecretRepository } from './secret.repository';
import { SecretValidator } from './secret.validator';
import { Secret } from '@prisma/client';
import { GetSecretParam } from './dto/get_secret.dto';
import { UserCreateSecretBody } from './dto/user_create_secret.dto';
import { CreateSecretBody } from './dto/create_secret.dto';
import { UniqueTokenGeneratorService } from '@src/util/unique-token-generator.service';

@Injectable()
export class SecretService {
  constructor(
    private secretRepository: SecretRepository,
    private secretValidator: SecretValidator,
    private uniqueTokenGenerator: UniqueTokenGeneratorService,
  ) {}

  async getSecret(param: GetSecretParam): Promise<string> {
    const result = await this.secretRepository.getSecret(
      this.secretValidator.getSecretValidator(param),
    );
    // if (!result) throw new NotFoundException('Not found secret');
    return result?.secret;
  }

  async createSecret(body: UserCreateSecretBody): Promise<string> {
    const uniqueId = this.uniqueTokenGenerator.generateToken();
    const createUserBody: CreateSecretBody = {
      urlId: uniqueId,
      secret: body.secret,
    };
    const result = await this.secretRepository.createSecret(
      this.secretValidator.createSecretValidator(createUserBody),
    );
    return result.urlId;
  }

  async deleteSecret(param: GetSecretParam): Promise<Secret> {
    return await this.secretRepository.deleteSecret(
      this.secretValidator.deleteSecretValidator(param),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { SecretValidator } from './secret.validator';

@Injectable()
export class SecretRepository {
  constructor(private prisma: PrismaService) {}

  async getSecret(
    secretFindUniqueArgs: ReturnType<SecretValidator['getSecretValidator']>,
  ) {
    return await this.prisma.secret.findUnique(secretFindUniqueArgs);
  }

  async createSecret(
    secretCreateArgs: ReturnType<SecretValidator['createSecretValidator']>,
  ) {
    return await this.prisma.secret.create({ data: secretCreateArgs });
  }

  async deleteSecret(
    secretDeleteInput: ReturnType<SecretValidator['deleteSecretValidator']>,
  ) {
    return await this.prisma.secret.update(secretDeleteInput);
  }
}

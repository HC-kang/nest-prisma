import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { SecretValidator } from './secret.validator';

@Injectable()
export class SecretRepository {
  constructor(private prisma: PrismaService) {}

  async getSecret(
    secretFindUniqueOrThrowArgs: ReturnType<
      SecretValidator['getSecretValidator']
    >,
  ) {
    try {
      return await this.prisma.secret.findUniqueOrThrow(
        secretFindUniqueOrThrowArgs,
      );
    } catch (e) {
      throw new NotFoundException('Not found secret');
    }
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

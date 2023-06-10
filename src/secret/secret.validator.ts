import { Injectable } from '@nestjs/common';
import { GetSecretParam } from './dto/get_secret.dto';
import { Prisma } from '@prisma/client';
import { CreateSecretBody } from './dto/create_secret.dto';
import { DeleteSecretParam } from './dto/delete_secret.dto';

@Injectable()
export class SecretValidator {
  getSecretValidator({ urlId }: GetSecretParam) {
    return Prisma.validator<Prisma.SecretFindUniqueArgs>()({
      rejectOnNotFound: true,
      where: {
        urlId,
      },
    });
  }

  createSecretValidator({ urlId, secret }: CreateSecretBody) {
    return Prisma.validator<Prisma.SecretCreateInput>()({
      urlId,
      secret,
    });
  }

  deleteSecretValidator({ urlId }: DeleteSecretParam) {
    return Prisma.validator<Prisma.SecretUpdateArgs>()({
      where: {
        urlId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

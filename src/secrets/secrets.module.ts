import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { SecretsRepository } from './secrets.repository';
import { PrismaModule } from '@prismaModule/prisma.module';
import { UniqueTokenGeneratorService } from '@src/util/unique-token-generator.service';

@Module({
  controllers: [SecretsController],
  providers: [SecretsService, SecretsRepository, UniqueTokenGeneratorService],
  imports: [PrismaModule],
})
export class SecretsModule {}

import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { SecretsRepository } from './secrets.repository';
import { PrismaModule } from '@prismaModule/prisma.module';

@Module({
  controllers: [SecretsController],
  providers: [SecretsService, SecretsRepository],
  imports: [PrismaModule],
})
export class SecretsModule {}

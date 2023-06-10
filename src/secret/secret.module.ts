import { Module } from '@nestjs/common';
import { SecretService } from './secret.service';
import { SecretController } from './secret.controller';
import { SecretRepository } from './secret.repository';
import { SecretValidator } from './secret.validator';

@Module({
  providers: [SecretService, SecretRepository, SecretValidator],
  controllers: [SecretController],
})
export class SecretModule {}

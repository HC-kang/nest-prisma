import { Global, Module } from '@nestjs/common';
import { UniqueTokenGeneratorService } from './unique-token-generator.service';

@Global()
@Module({
  providers: [UniqueTokenGeneratorService],
  exports: [UniqueTokenGeneratorService],
})
export class UtilModule {}

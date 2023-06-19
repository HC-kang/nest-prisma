import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [UtilModule, ArticlesModule],
})
export class AppModule {}

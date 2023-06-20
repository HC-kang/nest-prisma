import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UtilModule, ArticlesModule, UsersModule, AuthModule],
})
export class AppModule {}

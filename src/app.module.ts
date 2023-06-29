import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config';
import { SecretsModule } from './secrets/secrets.module';
import { CommentsModule } from './comments/comments.module';
import { PostCategoriesModule } from './post-categories/post-categories.module';

@Module({
  imports: [
    UtilModule,
    UsersModule,
    AuthModule,
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      validationSchema,
    }),
    SecretsModule,
    CommentsModule,
    PostCategoriesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config';
import { SecretsModule } from './secrets/secrets.module';

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
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    UtilModule,
    UsersModule,
    AuthModule,
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        NEST_APP_PORT: Joi.number().required(),
        API_AUTH_ADMIN_USERNAME: Joi.string().required(),
        API_AUTH_ADMIN_PASSWORD: Joi.string().required(),
        SWAGGER_DOC_URL: Joi.string().required().pattern(new RegExp('^/.*$')),
        CORS_ORIGIN: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Prisma NestJS Board')
    .setDescription('Prisma NestJS Board API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    configService.get<string>('SWAGGER_DOC_URL'),
    app,
    document,
  );
};

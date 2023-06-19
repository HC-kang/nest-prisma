import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './config/winston.config';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { TransformInterceptor } from './common/filters/transform.interceptors';
import { PrismaExceptionFilter } from './common/filters/prisma.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: CustomLogger,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor(),
  );
  app.enableVersioning();
  await app.listen(3000);
}
bootstrap();

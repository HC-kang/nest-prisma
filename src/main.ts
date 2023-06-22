import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './config/winston.config';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { TransformInterceptor } from './common/filters/transform.interceptors';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client.exception.filter';
import { ConfigService } from '@nestjs/config';
import { setupApiAuth } from './config/api-auth.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: CustomLogger,
  });
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor(),
  );
  app.enableVersioning();

  if (configService.get<string>('NODE_ENV') !== 'development')
    setupApiAuth(app);
  setupSwagger(app);

  await app.listen(configService.get<number>('NEST_APP_PORT'));
}
bootstrap();

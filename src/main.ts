import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './config/winston.config';
// import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { TransformInterceptor } from './common/filters/transform.interceptors';
// import { PrismaExceptionFilter } from './common/filters/prisma.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: CustomLogger,
  });

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor(),
  );
  app.enableVersioning();
  await app.listen(3000);
}
bootstrap();

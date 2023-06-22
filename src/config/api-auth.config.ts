import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as expressBasicAuth from 'express-basic-auth';

export function setupApiAuth(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const options = {
    challenge: true,
    users: {
      [configService.get<string>('API_AUTH_ADMIN_USERNAME')]:
        configService.get<string>('API_AUTH_ADMIN_PASSWORD'),
    },
  };
  const createUrlArray = (url: string): string[] => [url, url + '-json'];
  app.use(
    createUrlArray(configService.get<string>('SWAGGER_DOC_URL')),
    expressBasicAuth(options),
  );
}

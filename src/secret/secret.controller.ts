import { Controller, Get } from '@nestjs/common';
import { SecretService } from './secret.service';

@Controller({
  path: 'secret',
  version: '1',
})
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get()
  async getSecret() {
    return 'secret';
  }
}

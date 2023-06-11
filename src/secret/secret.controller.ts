import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SecretService } from './secret.service';
import { GetSecretParam } from './dto/get_secret.dto';
import { CreateSecretBody } from './dto/create_secret.dto';

@Controller({
  path: 'secrets',
  version: '1',
})
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get('/:urlId')
  async getSecret(@Param() param: GetSecretParam) {
    return await this.secretService.getSecret(param);
  }

  @Post()
  async createSecret(@Body() body: CreateSecretBody) {
    return await this.secretService.createSecret(body);
  }

  @Delete('/:urlId')
  async deleteSecret(@Param() param: GetSecretParam) {
    return await this.secretService.deleteSecret(param);
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SecretEntity } from './entities/secret.entity';
import { CreateSecretRequestDto } from './dto/create-secret-request.dto';

@Controller({
  path: 'secrets',
  version: '1',
})
@ApiTags('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post()
  @ApiCreatedResponse({ type: SecretEntity })
  async create(@Body() createSecretRequestDto: CreateSecretRequestDto) {
    return await this.secretsService.create(createSecretRequestDto);
  }

  @Get()
  @ApiOkResponse({ type: [SecretEntity] })
  async findAll() {
    return await this.secretsService.findAll();
  }

  @Get(':urlId')
  @ApiOkResponse({ type: SecretEntity })
  async findOne(@Param('urlId') urlId: string) {
    return await this.secretsService.findOne(urlId);
  }
}

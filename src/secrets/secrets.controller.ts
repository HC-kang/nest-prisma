import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { CreateSecretDto } from './dto/create-secret.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'secrets',
  version: '1',
})
@ApiTags('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post()
  async create(@Body() createSecretDto: CreateSecretDto) {
    return await this.secretsService.create(createSecretDto);
  }

  @Get()
  async findAll() {
    return await this.secretsService.findAll();
  }

  @Get(':urlId')
  async findOne(@Param('urlId') urlId: string) {
    return await this.secretsService.findOne(urlId);
  }
}

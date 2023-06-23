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
  create(@Body() createSecretDto: CreateSecretDto) {
    return this.secretsService.create(createSecretDto);
  }

  @Get()
  findAll() {
    return this.secretsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secretsService.findOne(+id);
  }
}

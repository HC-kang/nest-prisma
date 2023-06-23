import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { CreateSecretDto } from './dto/create-secret.dto';

@Injectable()
export class SecretsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSecretDto: CreateSecretDto) {
    return this.prisma.secret.create({ data: createSecretDto });
  }

  async findAll() {
    return await this.prisma.secret.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.secret.findUniqueOrThrow({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.secret.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailConflictException } from '@src/common/exceptions/email.conflict.exception';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('User Not Found Exception');
      }
      throw new Error(e.message);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw new EmailConflictException();
      throw new Error(e.message);
    }
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

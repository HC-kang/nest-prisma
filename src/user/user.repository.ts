import { Injectable, NotFoundException } from '@nestjs/common';
import { UserValidator } from './user.validator';
import { PrismaService } from '@prismaModule/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(
    userFindUniqueOrThrowArgs: ReturnType<UserValidator['getUserValidator']>,
  ) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow(userFindUniqueOrThrowArgs);
      return user
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('User Not Found Exception');
      }
      throw new Error(e.message);
    }
  }

  async createUser(
    userCreateArgs: ReturnType<UserValidator['createUserValidator']>,
  ) {
    return await this.prisma.user.create({ data: userCreateArgs });
  }

  async updateUser(
    userUpdateInput: ReturnType<UserValidator['updateUserValidator']>,
  ) {
    return await this.prisma.user.update(userUpdateInput);
  }

  async deleteUser(
    userDeleteInput: ReturnType<UserValidator['deleteUserValidator']>,
  ) {
    return await this.prisma.user.update(userDeleteInput);
  }
}

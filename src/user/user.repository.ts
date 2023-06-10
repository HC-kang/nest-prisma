import { Injectable } from '@nestjs/common';
import { UserValidator } from './user.validator';
import { PrismaService } from '@prismaModule/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(
    userFindUniqueArgs: ReturnType<UserValidator['getUserValidator']>,
  ) {
    return await this.prisma.user.findUnique(userFindUniqueArgs);
  }

  async createUser(
    createUserArgs: ReturnType<UserValidator['createUserValidator']>,
  ) {
    return await this.prisma.user.create({ data: createUserArgs });
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

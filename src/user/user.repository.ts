import { Injectable } from '@nestjs/common';
import { UserValidator } from './user.validator';
import { PrismaService } from '@prismaModule/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUser(userFindUniqueArgs: ReturnType<UserValidator['getUserValidator']>) {
    return this.prisma.user.findUnique(userFindUniqueArgs);
  }

  createUser(data: ReturnType<UserValidator['createUserValidator']>) {
    return this.prisma.user.create({
      data,
    });
  }

  updateUser(
    userUpdateInput: ReturnType<UserValidator['updateUserValidator']>,
  ) {
    return this.prisma.user.update(userUpdateInput);
  }

  deleteUser(
    userDeleteInput: ReturnType<UserValidator['deleteUserValidator']>,
  ) {
    return this.prisma.user.update(userDeleteInput);
  }
}

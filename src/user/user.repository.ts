import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserValidator } from './user.validator';

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

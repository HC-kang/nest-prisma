import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetUserParam } from './dto/get_user.dto';
import { CreateUserBody } from './dto/create_user.dto';

@Injectable()
export class UserValidator {
  getUserValidator({ userId }: GetUserParam) {
    return Prisma.validator<Prisma.UserFindUniqueArgs>()({
      rejectOnNotFound: true,
      where: {
        id: Number(userId),
      },
    });
  }

  createUserValidator({ email, name }: CreateUserBody) {
    return Prisma.validator<Prisma.UserCreateInput>()({
      email,
      name,
    });
  }
}

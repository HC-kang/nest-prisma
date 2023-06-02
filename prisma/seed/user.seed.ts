import { Prisma } from '@prisma/client';

export const users = Prisma.validator<Prisma.UserCreateManyArgs>()({
  data: [
    {
      name: 'admin',
      email: 'admin@admin.com',
      active: 1,
      role: 'ADMIN',
    },
    {
      name: 'test',
      email: 'test@test.com',
      active: 0,
      role: 'USER',
    },
    {
      name: 'test2',
      email: 'test2@test2,com',
      active: 1,
      role: 'USER',
    },
  ],
});

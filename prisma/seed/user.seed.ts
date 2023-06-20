import { PrismaClient } from '@prisma/client';

export const seedUsers = async (prisma: PrismaClient) => {
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: 'passwordSabin',
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: 'passwordSabin',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: 'passwordAlex',
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: 'passwordAlex',
    },
  });
};

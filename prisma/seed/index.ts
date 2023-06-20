import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';

const prisma = new PrismaClient();

const main = async () => {
  await seedUsers(prisma);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

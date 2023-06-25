import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const fordPassword = await bcrypt.hash('12341234', roundsOfHashing);
  const stellaPassword = await bcrypt.hash('12341234', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'ford@admin.com' },
    update: {
      password: fordPassword,
    },
    create: {
      email: 'ford@admin.com',
      name: 'Ford',
      password: fordPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'stella@admin.com' },
    update: {
      password: stellaPassword,
    },
    create: {
      email: 'stella@admin.com',
      name: 'Stella',
      password: stellaPassword,
    },
  });

  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user1.id,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

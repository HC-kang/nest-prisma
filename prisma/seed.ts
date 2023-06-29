import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const fordPassword = await bcrypt.hash('12341234', roundsOfHashing);
  const stellaPassword = await bcrypt.hash('12341234', roundsOfHashing);

  const postCategory1 = await prisma.postCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'News',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'ford@admin.com' },
    update: {
      password: fordPassword,
    },
    create: {
      email: 'ford@admin.com',
      name: 'Ford',
      password: fordPassword,
      level: 1,
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
      level: 1,
    },
  });

  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {
      userId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      content:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
      strippedContent:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
      postCategoryId: postCategory1.id,
      userId: user1.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {
      userId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      strippedContent:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      postCategoryId: postCategory1.id,
      userId: user1.id,
    },
  });

  const comment1 = await prisma.comment.upsert({
    where: { id: 1 },
    update: {
      postId: post1.id,
      userId: user2.id,
    },
    create: {
      content: 'Great news!',
      strippedContent: 'Great news!',
    },
  });

  const comment2 = await prisma.comment.upsert({
    where: { id: 2 },
    update: {
      postId: post2.id,
      userId: user1.id,
    },
    create: {
      content: 'Great news!',
      strippedContent: 'Great news!',
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

import { Module } from '@nestjs/common';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesRepository } from './post-categories.repository';
import { PrismaModule } from '@prismaModule/prisma.module';

@Module({
  controllers: [PostCategoriesController],
  providers: [PostCategoriesService, PostCategoriesRepository],
  imports: [PrismaModule],
})
export class PostCategoriesModule {}

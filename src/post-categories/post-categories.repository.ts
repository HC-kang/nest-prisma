import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';

@Injectable()
export class PostCategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostCategoryDto: CreatePostCategoryDto) {
    return this.prisma.postCategory.create({ data: createPostCategoryDto });
  }

  async findAll() {
    return await this.prisma.postCategory.findMany();
  }

  async findOne(postId: number) {
    return await this.prisma.postCategory.findUniqueOrThrow({
      where: { id: postId },
    });
  }

  async update(postId: number, updatePostCategoryDto: UpdatePostCategoryDto) {
    return await this.prisma.postCategory.update({
      where: { id: postId },
      data: updatePostCategoryDto,
    });
  }

  async remove(postId: number) {
    return await this.prisma.postCategory.delete({ where: { id: postId } });
  }
}

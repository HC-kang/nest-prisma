import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  async findAll() {
    return await this.prisma.post.findMany({ where: { isDraft: false } });
  }

  async findDrafts() {
    return await this.prisma.post.findMany({ where: { isDraft: true } });
  }

  async findOne(postId: number) {
    return await this.prisma.post.findUniqueOrThrow({
      where: { id: postId },
      include: { user: true },
    });
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id: postId },
      data: updatePostDto,
    });
  }

  async remove(postId: number) {
    return await this.prisma.post.delete({ where: { id: postId } });
  }
}

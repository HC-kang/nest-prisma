import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaModule/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.prisma.comment.create({ data: createCommentDto });
  }

  async findAllByPostId(postId: number) {
    return await this.prisma.comment.findMany({ where: { postId } });
  }

  async findOne(postId: number, commentId: number) {
    console.error(postId, commentId);
    const result = await this.prisma.comment.findFirstOrThrow({
      where: {
        AND: [{ postId: postId }, { id: commentId }],
      },
    });
    console.log(result);
    return result;
  }

  async update(
    postId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    return await this.prisma.comment.update({
      where: { id: commentId },
      data: updateCommentDto,
    });
  }

  async remove(postId: number, commentId: number) {
    return await this.prisma.comment.delete({ where: { id: commentId } });
  }
}

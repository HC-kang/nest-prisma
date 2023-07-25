import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repository';
import { UserEntity } from '@src/users/entities/user.entity';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';
import { stripHtmlTags } from '@src/common/utils/utils';
import { strings } from '@src/common/resources/strings';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async create(
    userId: number,
    postId: number,
    createCommentRequestDto: CreateCommentRequestDto,
  ) {
    const createCommentDto: CreateCommentDto = {
      ...createCommentRequestDto,
      userId: userId,
      postId,
      strippedContent: stripHtmlTags(createCommentRequestDto.content),
    };
    return await this.commentsRepository.create(createCommentDto);
  }

  async findAllByPostId(postId: number) {
    return await this.commentsRepository.findAllByPostId(postId);
  }

  async findOne(postId: number, commentId: number) {
    return await this.commentsRepository.findOne(postId, commentId);
  }

  async update(
    postId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
    currentUser: Partial<UserEntity>,
  ) {
    const aComment = await this.commentsRepository.findOne(postId, commentId);
    if (aComment?.userId !== currentUser.id) {
      throw new UnauthorizedException(strings.common.errors.unauthorized);
    }
    return await this.commentsRepository.update(postId, commentId, {
      ...updateCommentDto,
      strippedContent: stripHtmlTags(updateCommentDto.content),
    });
  }

  async remove(
    postId: number,
    commentId: number,
    currentUser: Partial<UserEntity>,
  ) {
    const aComment = await this.commentsRepository.findOne(postId, commentId);
    if (aComment?.userId !== currentUser.id) {
      throw new UnauthorizedException(strings.common.errors.unauthorized);
    }
    return await this.commentsRepository.remove(postId, commentId);
  }
}

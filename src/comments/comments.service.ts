import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repository';
import { UserEntity } from '@src/users/entities/user.entity';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async create(
    userId: number,
    createCommentRequestDto: CreateCommentRequestDto,
  ) {
    const createCommentDto: CreateCommentDto = {
      ...createCommentRequestDto,
      userId: userId,
    };
    return await this.commentsRepository.create(createCommentDto);
  }

  async findAll() {
    return await this.commentsRepository.findAll();
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne(id);
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    currentUser: Partial<UserEntity>,
  ) {
    const aComment = await this.commentsRepository.findOne(id);
    if (aComment?.userId !== currentUser.id) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return await this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number, currentUser: Partial<UserEntity>) {
    const aComment = await this.commentsRepository.findOne(id);
    if (aComment?.userId !== currentUser.id) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return await this.commentsRepository.remove(id);
  }
}

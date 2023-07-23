import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UserEntity } from '@src/users/entities/user.entity';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(userId: number, createPostRequestDto: CreatePostRequestDto) {
    const createPostDto: CreatePostDto = {
      ...createPostRequestDto,
      userId: userId,
      strippedContent: createPostRequestDto.content, // TODO: strip HTML tags
    };
    return await this.postsRepository.create(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findDrafts() {
    return await this.postsRepository.findDrafts();
  }

  async findOne(postId: number) {
    return await this.postsRepository.findOne(postId);
  }

  async update(
    postId: number,
    updatePostDto: UpdatePostDto,
    currentUser: Partial<UserEntity>,
  ) {
    const aPost = await this.postsRepository.findOne(postId);
    if (aPost?.userId !== currentUser.id) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return await this.postsRepository.update(postId, updatePostDto);
  }

  async remove(postId: number, currentUser: Partial<UserEntity>) {
    const aPost = await this.postsRepository.findOne(postId);
    if (aPost?.userId !== currentUser.id) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return await this.postsRepository.remove(postId);
  }
}

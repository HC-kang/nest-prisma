import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UserEntity } from '@src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.create(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findDrafts() {
    return await this.postsRepository.findDrafts();
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne(id);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    currentUser: Partial<UserEntity>,
  ) {
    if (currentUser.id !== id) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number, currentUser: Partial<UserEntity>) {
    if (currentUser.id !== id) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return await this.postsRepository.remove(id);
  }
}

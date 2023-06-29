import { Injectable } from '@nestjs/common';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { PostCategoriesRepository } from './post-categories.repository';

@Injectable()
export class PostCategoriesService {
  constructor(
    private readonly postCategoriesRepository: PostCategoriesRepository,
  ) {}

  async create(createPostCategoryDto: CreatePostCategoryDto) {
    return await this.postCategoriesRepository.create(createPostCategoryDto);
  }

  async findAll() {
    return await this.postCategoriesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.postCategoriesRepository.findOne(id);
  }

  async update(id: number, updatePostCategoryDto: UpdatePostCategoryDto) {
    return await this.postCategoriesRepository.update(
      id,
      updatePostCategoryDto,
    );
  }

  async remove(id: number) {
    return await this.postCategoriesRepository.remove(id);
  }
}

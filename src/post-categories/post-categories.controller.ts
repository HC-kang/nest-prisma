import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostCategoriesService } from './post-categories.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';

@Controller({
  path: 'post-categories',
  version: '1',
})
export class PostCategoriesController {
  constructor(private readonly postCategoriesService: PostCategoriesService) {}

  @Post()
  async create(@Body() createPostCategoryDto: CreatePostCategoryDto) {
    return await this.postCategoriesService.create(createPostCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.postCategoriesService.findAll();
  }

  @Get(':postCategoryId')
  async findOne(@Param('postCategoryId', ParseIntPipe) postCategoryId: number) {
    return await this.postCategoriesService.findOne(postCategoryId);
  }

  @Patch(':postCategoryId')
  async update(
    @Param('postCategoryId', ParseIntPipe) postCategoryId: number,
    @Body() updatePostCategoryDto: UpdatePostCategoryDto,
  ) {
    return await this.postCategoriesService.update(
      postCategoryId,
      updatePostCategoryDto,
    );
  }

  @Delete(':postCategoryId')
  async remove(@Param('postCategoryId', ParseIntPipe) postCategoryId: number) {
    return await this.postCategoriesService.remove(postCategoryId);
  }
}

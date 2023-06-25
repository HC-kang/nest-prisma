import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { CurrentUser } from '@src/common/decorators/current-user.decorator';
import { UserEntity } from '@src/users/entities/user.entity';
import { CreatePostRequestDto } from './dto/create-post-request.dto';

@Controller({
  path: 'posts',
  version: '1',
})
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostEntity })
  async create(
    @Body() createPostRequestDto: CreatePostRequestDto,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return new PostEntity(
      await this.postsService.create(user.id, createPostRequestDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [PostEntity] })
  async findAll() {
    const posts = await this.postsService.findAll();
    return posts.map((post) => new PostEntity(post));
  }

  @Get('drafts')
  @ApiOkResponse({ type: [PostEntity] })
  async findDrafts() {
    const drafts = await this.postsService.findDrafts();
    return drafts.map((post) => new PostEntity(post));
  }

  @Get(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('postId', ParseIntPipe) postId: number) {
    return new PostEntity(await this.postsService.findOne(postId));
  }

  @Patch(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return new PostEntity(
      await this.postsService.update(postId, updatePostDto, user),
    );
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return new PostEntity(await this.postsService.remove(postId, user));
  }
}

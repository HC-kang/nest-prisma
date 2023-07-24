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
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from '@src/common/decorators/current-user.decorator';
import { UserEntity } from '@src/users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';

@Controller({
  path: 'posts/:postId/comments',
  version: '1',
})
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CommentEntity })
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return await this.commentsService.create(
      user.id,
      postId,
      createCommentRequestDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CommentEntity] })
  async findAll(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentsService.findAllByPostId(postId);
  }

  @Get(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async findOne(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.commentsService.findOne(postId, commentId);
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return await this.commentsService.update(
      postId,
      commentId,
      updateCommentDto,
      user,
    );
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return await this.commentsService.remove(postId, commentId, user);
  }
}

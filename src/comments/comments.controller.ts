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
  path: 'comments',
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
    @Body() createCommentRequestDto: CreateCommentRequestDto,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return await this.commentsService.create(user.id, createCommentRequestDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CommentEntity] })
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Get(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async findOne(@Param('commentId', ParseIntPipe) commentId: number) {
    return await this.commentsService.findOne(commentId);
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return await this.commentsService.update(commentId, updateCommentDto, user);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async remove(
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() user: Partial<UserEntity>,
  ) {
    return await this.commentsService.remove(commentId, user);
  }
}

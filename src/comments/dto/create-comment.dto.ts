import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCommentRequestDto } from './create-comment-request.dto';

export class CreateCommentDto extends CreateCommentRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  authorId: number;
}

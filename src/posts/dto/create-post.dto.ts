import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePostRequestDto } from './create-post-request.dto';

export class CreatePostDto extends CreatePostRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  authorId: number;
}

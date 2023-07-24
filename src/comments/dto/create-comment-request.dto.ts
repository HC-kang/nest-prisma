import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  @ApiProperty()
  content: string;
}

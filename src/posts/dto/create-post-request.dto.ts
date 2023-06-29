import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  postCategoryId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isNotice?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isSecret?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isDraft?: boolean = false;
}

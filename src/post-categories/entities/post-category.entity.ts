import { ApiProperty } from '@nestjs/swagger';
import { PostCategory } from '@prisma/client';

export class PostCategoryEntity implements PostCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { UserEntity } from '@src/users/entities/user.entity';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  strippedContent: string;

  @ApiProperty()
  postCategoryId: number;

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  isNotice: boolean;

  @ApiProperty()
  isSecret: boolean;

  @ApiProperty()
  isDraft: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  userId: number;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  constructor({ user, ...data }: Partial<PostEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}

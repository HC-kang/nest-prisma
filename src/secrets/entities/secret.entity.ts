import { ApiProperty } from '@nestjs/swagger';
import { Secret } from '@prisma/client';

export class SecretEntity implements Secret {
  @ApiProperty()
  id: number;

  @ApiProperty()
  urlId: string;

  @ApiProperty()
  secret: string;
}

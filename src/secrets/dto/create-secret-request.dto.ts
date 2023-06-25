import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSecretRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  secret: string;
}

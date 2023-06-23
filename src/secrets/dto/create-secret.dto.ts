import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateSecretDto {
  @IsString()
  @IsOptional()
  @MinLength(10)
  @ApiProperty()
  urlId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  secret: string;
}

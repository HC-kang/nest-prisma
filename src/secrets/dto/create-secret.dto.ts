import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateSecretRequestDto } from './create-secret-request.dto';

export class CreateSecretDto extends CreateSecretRequestDto {
  @IsString()
  @IsOptional()
  @MinLength(10)
  @ApiProperty()
  urlId: string;
}

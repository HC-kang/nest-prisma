// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ required: false })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  active?: number = 1;

  @IsEnum(Role)
  @ApiProperty({ required: false, default: false })
  role?: Role = Role.USER;
}

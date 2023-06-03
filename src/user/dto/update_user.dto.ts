import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserParam {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;
}

export class UpdateUserBody {
  @IsString()
  @IsNotEmpty()
  name: string;
}

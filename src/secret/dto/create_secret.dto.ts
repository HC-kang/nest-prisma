import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSecretBody {
  @IsString()
  @IsNotEmpty()
  urlId: string;

  @IsString()
  @IsNotEmpty()
  secret: string;
}

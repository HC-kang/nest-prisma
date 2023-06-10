import { IsNotEmpty, IsString } from 'class-validator';

export class GetSecretParam {
  @IsString()
  @IsNotEmpty()
  urlId: string;
}

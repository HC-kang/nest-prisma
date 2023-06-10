import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSecretParam {
  @IsString()
  @IsNotEmpty()
  urlId: string;
}

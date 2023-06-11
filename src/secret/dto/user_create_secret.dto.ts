import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateSecretBody {
  @IsString()
  @IsNotEmpty()
  secret: string;
}

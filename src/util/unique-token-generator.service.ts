import { Injectable } from '@nestjs/common';
import { TokenGenerator } from './interface/token_generator.interface';

@Injectable()
export class UniqueTokenGeneratorService implements TokenGenerator {
  generateToken = (): string => {
    const len = 20;
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };
}

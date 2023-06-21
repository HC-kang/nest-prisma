import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '@src/users/entities/user.entity';
import { plainToClass } from 'class-transformer';

const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
  const user = context.switchToHttp().getRequest().user;
  // to avoid returning the password, I used class-transformer
  return plainToClass(UserEntity, user);
};

/**
 * This function is used to get the current user from the request object.
 * it is used in the @CurrentUser decorator and needs the guard to be activated.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

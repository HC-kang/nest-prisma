import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { GetUserParam } from './dto/get_user.dto';
import { UserValidator } from './user.validator';
import { CreateUserBody } from './dto/create_user.dto';
import { UpdateUserBody, UpdateUserParam } from './dto/update_user.dto';
import { DeleteUserParam } from './dto/delete_user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userValidator: UserValidator,
  ) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  getUser(param: GetUserParam) {
    return this.userRepository.getUser(
      this.userValidator.getUserValidator(param),
    );
  }

  createUser(body: CreateUserBody) {
    return this.userRepository.createUser(
      this.userValidator.createUserValidator(body),
    );
  }

  updateUser(param: UpdateUserParam, body: UpdateUserBody) {
    return this.userRepository.updateUser(
      this.userValidator.updateUserValidator(param, body),
    );
  }

  deleteUser(param: DeleteUserParam) {
    return this.userRepository.deleteUser(
      this.userValidator.deleteUserValidator(param),
    );
  }
}

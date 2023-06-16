import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(param: GetUserParam) {
    // const user = 
    // if (!user) {
    //   throw new NotFoundException('user not found error');
    // }
    return await this.userRepository.getUser(
      this.userValidator.getUserValidator(param),
    );
  }

  async createUser(body: CreateUserBody) {
    return await this.userRepository.createUser(
      this.userValidator.createUserValidator(body),
    );
  }

  async updateUser(param: UpdateUserParam, body: UpdateUserBody) {
    return await this.userRepository.updateUser(
      this.userValidator.updateUserValidator(param, body),
    );
  }

  async deleteUser(param: DeleteUserParam) {
    return await this.userRepository.deleteUser(
      this.userValidator.deleteUserValidator(param),
    );
  }
}

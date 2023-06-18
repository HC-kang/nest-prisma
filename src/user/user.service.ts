import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(id: number) {
    return await this.userRepository.getUser(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id);
  }
}

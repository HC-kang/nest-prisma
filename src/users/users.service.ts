import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { strings } from '@src/common/resources/strings';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(userId: number) {
    return await this.usersRepository.findOne(userId);
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
    currentUser: Partial<UserEntity>,
  ) {
    if (currentUser.id !== userId) {
      throw new UnauthorizedException(strings.common.errors.unauthorized);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return await this.usersRepository.update(userId, updateUserDto);
  }

  async remove(userId: number, currentUser: Partial<UserEntity>) {
    if (currentUser.id !== userId) {
      throw new UnauthorizedException(strings.common.errors.unauthorized);
    }
    return await this.usersRepository.remove(userId);
  }
}

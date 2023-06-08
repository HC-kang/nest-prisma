import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserParam } from './dto/get_user.dto';
import { CreateUserBody } from './dto/create_user.dto';
import { UpdateUserBody, UpdateUserParam } from './dto/update_user.dto';
import { DeleteUserParam } from './dto/delete_user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  async getUser(@Param() param: GetUserParam) {
    return await this.userService.getUser(param);
  }

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    return await this.userService.createUser(body);
  }

  @Patch('/:userId')
  async updateUser(
    @Param() param: UpdateUserParam,
    @Body() body: UpdateUserBody,
  ) {
    return await this.userService.updateUser(param, body);
  }

  @Delete('/:userId')
  async deleteUser(@Param() param: DeleteUserParam) {
    return await this.userService.deleteUser(param);
  }
}

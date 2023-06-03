import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserParam } from './dto/get_user.dto';
import { CreateUserBody } from './dto/create_user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  getUser(@Param() param: GetUserParam) {
    return this.userService.getUser(param);
  }

  @Post()
  createUser(@Body() body: CreateUserBody) {
    return this.userService.createUser(body);
  }
}

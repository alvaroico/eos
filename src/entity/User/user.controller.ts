import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(
    @Body() request: { user: User; password: string },
  ): Promise<User> {
    const { user, password } = request;
    return await this.userService.create(user, password);
  }
}

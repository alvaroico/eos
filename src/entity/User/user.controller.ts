import { Body, Controller, Get, Post } from '@nestjs/common';
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
  @Post('/login')
  async login(@Body() request: { email: string; password: string }) {
    const { email, password } = request;
    return await this.userService.checkPassword(email, password);
  }
}

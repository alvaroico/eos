import { Controller, Get } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }
}

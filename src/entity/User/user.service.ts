import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';
import { Password } from '../Password/password.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User, password: string): Promise<User> {
    return this.userRepository.manager.transaction(async (manager) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userNew = await manager.save(new User(user.name, user.email));
      const newPassword = new Password(hashedPassword, userNew.id);
      await manager.save(newPassword);
      return userNew;
    });
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private tarefasRepository: Repository<Users>,
  ) {}
  async findAll(): Promise<Users[]> {
    return this.tarefasRepository.find();
  }
}

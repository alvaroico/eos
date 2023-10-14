import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Password } from './password.entity';

@Injectable()
export class PasswordService {
  constructor(
    @Inject('PASSWORD_REPOSITORY')
    private passwordRepository: Repository<Password>,
  ) {}
  async findAll(): Promise<Password[]> {
    return this.passwordRepository.find();
  }
}

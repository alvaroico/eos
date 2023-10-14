import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from './user.entity';
import { Password } from '../Password/password.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PASSWORD_REPOSITORY')
    private passwordRepository: Repository<Password>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User, password: string): Promise<User> {
    const exists = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (exists) {
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
    }
    return this.userRepository.manager.transaction(async (manager) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userNew = await manager.save(new User(user.name, user.email));
      const newPassword = new Password(hashedPassword, userNew.id);
      await manager.save(newPassword);
      return userNew;
    });
  }

  async checkPassword(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    console.log(user.id);

    const passwordEntity = await this.passwordRepository.findOne({
      where: { user_id: user.id },
    });

    if (!passwordEntity) {
      throw new HttpException('Senha não encontrada', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, passwordEntity.password);

    if (!isMatch) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }

    if (isMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, 'secret', {
        expiresIn: '1h',
      });
      return { token: token };
    }

    throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

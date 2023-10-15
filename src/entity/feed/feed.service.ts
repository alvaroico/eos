import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../Post/post.entity';

@Injectable()
export class TarefasService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
}

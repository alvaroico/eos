import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ITokenJWT } from 'src/guard/auth.guard.interface';
import { Post } from '../Post/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
  async create(comment: Comment, token: ITokenJWT): Promise<Comment> {
    const post = await this.postRepository.findOne({
      where: { id: comment.post_id },
    });
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }
    comment.user_id = token.id;
    return this.commentRepository.save(comment);
  }
}

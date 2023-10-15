import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ITokenJWT } from 'src/guard/auth.guard.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }
  async newPost(post: Post, token: ITokenJWT): Promise<Post> {
    post.user_id = token.id;
    return this.postRepository.save(post);
  }
}

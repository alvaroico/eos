import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }
    post.views++;
    this.postRepository.save(post);
    return post;
  }
  async likeId(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }
    post.likes++;
    this.postRepository.save(post);
    return post;
  }

  async dislikesId(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }
    post.dislikes++;
    this.postRepository.save(post);
    return post;
  }
  async newPost(post: Post, token: ITokenJWT): Promise<Post> {
    post.user_id = token.id;
    return this.postRepository.save(post);
  }
  async update(
    editPost: Post,
    token: ITokenJWT,
  ): Promise<Post | { mensagem: string }> {
    const post = await this.postRepository.findOne({
      where: { id: editPost.id },
    });
    console.log(post);
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }
    if (post.user_id !== token.id) {
      throw new HttpException(
        'Usuário não autorizado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    post.title = editPost.title;
    post.description = editPost.description;

    return this.postRepository.save(post);
  }
}

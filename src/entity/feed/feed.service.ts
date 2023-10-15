import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../Post/post.entity';
import { Comment } from '../Comment/comment.entity';
import { Feed } from './feed.interface';

@Injectable()
export class FeedService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Feed[]> {
    const feedRelatorio = await this.postRepository.find({
      select: ['id', 'description', 'likes', 'dislikes'],
    });

    const feedFormatado = [] as Feed[];
    for (const post of feedRelatorio) {
      // Todo: Refatorar para usar o count do banco de dados na consulta do post
      const commentsTotal = await this.commentRepository.count({
        where: { post_id: post.id },
      });

      feedFormatado.push({
        id: post.id,
        titulo: post.description,
        commentsTotal,
        likesTotal: post.likes,
        dislikesTotal: post.dislikes,
      });
    }

    return feedFormatado;
  }
}

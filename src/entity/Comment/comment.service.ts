import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ITokenJWT } from 'src/guard/auth.guard.interface';
import { Post } from '../Post/post.entity';
import { User } from '../User/user.entity';
import { sendEmail } from 'src/email/inde';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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

    const user = await this.userRepository.findOne({
      where: { id: post.user_id },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    const newComment = await this.commentRepository.save(comment);
    if (user.email)
      await sendEmail(
        user.email,
        'Novo comentário',
        'Você recebeu um novo comentário ' + comment.description,
      );
    return newComment;
  }

  async editComment(
    comment: Comment,
    token: ITokenJWT,
    id: string,
  ): Promise<Comment> {
    const getComment = await this.commentRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!getComment || getComment.deleted_at) {
      throw new HttpException(
        'Comentário não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    if (getComment.user_id !== token.id) {
      throw new HttpException(
        'Você não tem permissão para editar este comentário',
        HttpStatus.UNAUTHORIZED,
      );
    }
    getComment.description = comment.description;
    return this.commentRepository.save(getComment);
  }

  async deleteComment(token: ITokenJWT, id: string): Promise<Comment> {
    const getComment = await this.commentRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!getComment || getComment.deleted_at) {
      throw new HttpException(
        'Comentário não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const getPost = await this.postRepository.findOne({
      where: { id: getComment.post_id },
    });

    if (!getPost) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }

    if (getComment.user_id !== token.id && getPost.user_id !== token.id) {
      throw new HttpException(
        'Você não tem permissão para deletar este comentário',
        HttpStatus.UNAUTHORIZED,
      );
    }
    getComment.deleted_at = new Date();
    getComment.user_deleted_at = token.id;
    return await this.commentRepository.save(getComment);
  }
}

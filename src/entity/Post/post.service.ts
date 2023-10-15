import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ITokenJWT } from 'src/guard/auth.guard.interface';
import * as fs from 'fs';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}
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

  async newPost(
    post: Post,
    token: ITokenJWT,
    file: Express.Multer.File,
  ): Promise<Post> {
    // Todo: migrar para servidor butbucket
    if (!file) {
      throw new HttpException('Arquivo não enviado', HttpStatus.BAD_REQUEST);
    }
    const uploadDir = `${process.cwd()}${process.env.UPLOAD_DIR}`;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const tiposValidos = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!tiposValidos.includes(file.mimetype)) {
      throw new HttpException(
        'Tipo de arquivo inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tamanhoMaximo = 1024 * 1024 * 2;
    if (file.size > tamanhoMaximo) {
      throw new HttpException(
        'Tamanho máximo de arquivo excedido',
        HttpStatus.BAD_REQUEST,
      );
    }
    const formato = file.originalname.split('.').pop();
    const fileName = `${token.id}-${Date.now()}.${formato}`;
    fs.writeFileSync(`${uploadDir}/${fileName}`, file.buffer);

    post.user_id = token.id;
    post.file = fileName;

    return this.postRepository.save(post);
  }

  async update(
    editPost: Post,
    token: ITokenJWT,
  ): Promise<Post | { mensagem: string }> {
    const post = await this.postRepository.findOne({
      where: { id: editPost.id },
    });
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

import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ITokenJWT } from '../../guard/auth.guard.interface';
import { Post as PostEntity } from './post.entity';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        JwtService,
        {
          provide: 'POST_REPOSITORY',
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              title: 'Titulo texto',
              description: 'Descrição texto',
            }),
            likeId: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              title: 'Titulo texto',
              description: 'Descrição texto',
              likes: 1,
            }),
            dislikesId: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              title: 'Titulo texto',
              description: 'Descrição texto',
              dislikes: 1,
            }),
            newPost: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              title: 'Titulo texto',
              description: 'Descrição texto',
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              title: 'Titulo texto',
              description: 'Descrição texto',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('getId', () => {
    it('should return a post', async () => {
      const post = await controller.getId({ id: '1' });
      expect(post).toEqual({
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
      });
    });
  });

  describe('likeId', () => {
    it('should return a post with likes incremented', async () => {
      const post = await controller.likeId({ id: '1' });
      expect(post).toEqual({
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
        likes: 1,
      });
    });
  });

  describe('dislikesId', () => {
    it('should return a post with dislikes incremented', async () => {
      const post = await controller.dislikesId({ id: '1' });
      expect(post).toEqual({
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
        dislikes: 1,
      });
    });
  });

  describe('newPost', () => {
    it('should create a new post', async () => {
      const post: PostEntity = {
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
      };
      const request = {
        headers: {
          authorization: 'Bearer token',
        },
      } as Request;
      const token: ITokenJWT = { sub: 1 };
      jest.spyOn(jwtService, 'decode').mockReturnValue(token);

      const newPost = await controller.newPost({ post }, request);
      expect(newPost).toEqual({
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
      });
      expect(service.newPost).toHaveBeenCalledWith(post, token);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const post: PostEntity = {
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
      };
      const request = {
        headers: {
          authorization: 'Bearer token',
        },
      } as Request;
      const token: ITokenJWT = { sub: 1 };
      jest.spyOn(jwtService, 'decode').mockReturnValue(token);

      const updatedPost = await controller.updatePost({ post }, request);
      expect(updatedPost).toEqual({
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
      });
      expect(service.update).toHaveBeenCalledWith(post, token);
    });

    it('should return an error message if the post does not exist', async () => {
      const post: PostEntity = {
        id: 1,
        userId: 1,
        title: 'Titulo texto',
        description: 'Descrição texto',
      };
      const request = {
        headers: {
          authorization: 'Bearer token',
        },
      } as Request;
      const token: ITokenJWT = { sub: 1 };
      jest.spyOn(jwtService, 'decode').mockReturnValue(token);
      jest.spyOn(service, 'update').mockResolvedValue(null);

      const updatedPost = await controller.updatePost({ post }, request);
      expect(updatedPost).toEqual({ mensagem: 'Post not found' });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        {
          provide: 'POST_REPOSITORY',
          useValue: {
            create: jest.fn().mockResolvedValue({
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
  });

  describe('getAll', () => {
    it('should return an array of posts', async () => {
      const result: Post[] = [
        { id: 1, userId: 1, title: 'Test Post', description: 'Test Content' },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    });
  });
});

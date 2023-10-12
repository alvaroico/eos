import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        {
          provide: 'COMMENT_REPOSITORY',
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              user_id: 1,
              post_id: 1,
              description: 'Descrição texto',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  describe('getAll', () => {
    it('should return an array of comments', async () => {
      const result = [
        { id: 1, user_id: 1, post_id: 1, description: 'Comment 1' },
        { id: 2, user_id: 2, post_id: 2, description: 'Comment 2' },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    });
  });
});

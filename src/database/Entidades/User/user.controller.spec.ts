import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John',
              email: 'dssadasdas@sadasd.com',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        { id: 1, name: 'John', email: 'dasdsadsa@sdadas.com' },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    });
  });
});

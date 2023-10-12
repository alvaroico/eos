import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { Users } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'USERS_REPOSITORY',
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result: Users[] = [
        { id: 1, name: 'John', email: 'dasdsadsa@sdadas.com' },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    });
  });
});

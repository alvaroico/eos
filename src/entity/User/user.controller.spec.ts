import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

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
              id: Math.floor(Math.random() * 100000),
              name: 'John',
              email: 'dssadasdas@sadasd.com',
            }),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John',
              email: 'dssadasdas@sadasd.com',
            }),
          },
        },
        {
          provide: 'PASSWORD_REPOSITORY',
          useValue: {
            hash: jest.fn().mockResolvedValue('password'),
            compare: jest.fn().mockResolvedValue(true),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              password: 'password',
              user: {
                id: 1,
                name: 'John',
                email: 'dssadasdas@sadasd.com',
              },
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
        { id: 1, name: 'John', email: 'dasdsadsa@sadasd.com' },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('login', () => {
    it('should return a user if the email and password are correct', async () => {
      const email = 'dssadasdas@sadasd.com';
      const password = 'password';
      const request = { email, password };
      jest.spyOn(service, 'checkPassword').mockImplementation(async () => {
        return { token: 'some_token' };
      });
      const result = await controller.login(request);

      expect(result).toEqual({ token: 'some_token' });
      expect(service.checkPassword).toHaveBeenCalledWith(email, password);
    });

    it('should throw an HttpException if the password is incorrect', async () => {
      const email = 'dssadasdas@sadasd.com';
      const password = 'wrongpassword';
      const request = { email, password };
      jest.spyOn(service, 'checkPassword').mockImplementation(async () => {
        throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
      });

      try {
        await controller.login(request);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Senha incorreta');
        expect(error.status).toEqual(HttpStatus.UNAUTHORIZED);
      }
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'dssadasdas@sadasd.com',
      };
      const password = 'password';
      const request = { user, password };
      jest.spyOn(service, 'create').mockImplementation(async () => user);

      const result = await controller.create(request);

      // Check if the user was created
      expect(result.id).toBe(1);
      expect(result.name).toEqual(user.name);
      expect(result.email).toEqual(user.email);
      expect(service.create).toHaveBeenCalledWith(user, password);
    });

    it('should throw an HttpException if the user already exists', async () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'dssadasdas@sadasd.com',
      };
      const password = 'password';
      const request = { user, password };
      jest.spyOn(service, 'create').mockImplementation(async () => {
        throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
      });

      try {
        await controller.create(request);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Usuário já existe');
        expect(error.status).toEqual(HttpStatus.CONFLICT);
      }
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';
import { Tarefas } from './tarefas.entity';

describe('TarefasController', () => {
  let controller: TarefasController;
  let service: TarefasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarefasController],
      providers: [
        TarefasService,
        {
          provide: 'TAREFAS_REPOSITORY',
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              description: 'Test tarefa',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<TarefasController>(TarefasController);
    service = module.get<TarefasService>(TarefasService);
  });

  describe('getAll', () => {
    it('should return an array of tarefas', async () => {
      const result: Tarefas[] = [{ id: 1, description: 'Test tarefa' }];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('criarTarefas', () => {
    it('should create a new tarefa', async () => {
      const tarefa: Tarefas = { id: 1, description: 'Test tarefa' };
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(tarefa));

      expect(
        await controller.criarTarefas({ description: 'Test tarefa' }),
      ).toBe(tarefa);
    });
  });

  describe('updateTarefas', () => {
    it('should update an existing tarefa', async () => {
      const updateResult = { mensagem: 'Test tarefa' };
      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(updateResult));

      expect(
        await controller.updateTarefas({
          id: 1,
          description: 'Updated tarefa',
        }),
      ).toBe(updateResult);
    });

    it('should return an error message if the tarefa does not exist', async () => {
      const errorMessage = { mensagem: 'Tarefa not found' };
      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(errorMessage));

      expect(
        await controller.updateTarefas({
          id: 1,
          description: 'Updated tarefa',
        }),
      ).toBe(errorMessage);
    });
  });

  describe('deleteTarefas', () => {
    it('should delete an existing tarefa', async () => {
      const deleteResult = {
        affected: 1,
        raw: { id: 1 },
      };
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(deleteResult));

      expect(await controller.deleteTarefas({ id: 1 })).toBe(deleteResult);
    });
  });
});

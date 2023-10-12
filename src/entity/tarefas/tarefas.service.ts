import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IPutTarefa } from './interface/put.tarefa.interface';
import { Tarefas } from './tarefas.entity';

@Injectable()
export class TarefasService {
  constructor(
    @Inject('TAREFAS_REPOSITORY')
    private tarefasRepository: Repository<Tarefas>,
  ) {}
  async findAll(): Promise<Tarefas[]> {
    return this.tarefasRepository.find();
  }
  async create(tarefaString: string): Promise<Tarefas> {
    return this.tarefasRepository.save(new Tarefas(tarefaString));
  }
  async update(
    tarefa: IPutTarefa,
  ): Promise<UpdateResult | { mensagem: string }> {
    if (tarefa.id) {
      return this.tarefasRepository.update(
        tarefa.id,
        new Tarefas(tarefa.description, tarefa.id),
      );
    } else {
      return { mensagem: 'Id não enviado' };
    }
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.tarefasRepository.delete(id);
  }
}

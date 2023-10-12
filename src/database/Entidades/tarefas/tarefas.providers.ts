import { DataSource } from 'typeorm';
import { Tarefas } from './tarefas.entity';

export const TarefasProviders = [
  {
    provide: 'TAREFAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tarefas),
    inject: ['DATA_SOURCE'],
  },
];

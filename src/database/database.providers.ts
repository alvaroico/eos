import { Users } from './Entidades/User/users.entity';
import { Tarefas } from './Entidades/tarefas/tarefas.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'mydatabase',
        synchronize: true,
        logging: true,
        entities: [Tarefas, Users],
        subscribers: [],
        migrations: [],
      });

      return dataSource.initialize();
    },
  },
];

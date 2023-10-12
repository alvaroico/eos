import { Post } from './Entidades/Post/post.entity';
import { User } from './Entidades/User/user.entity';
import { Tarefas } from './Entidades/tarefas/tarefas.entity';
import { Comment } from './Entidades/Comment/comment.entity';
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
        entities: [Tarefas, User, Post, Comment],
        subscribers: [],
        migrations: [],
      });

      return dataSource.initialize();
    },
  },
];

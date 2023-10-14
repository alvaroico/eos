import { Post } from '../entity/Post/post.entity';
import { User } from '../entity/User/user.entity';
import { Tarefas } from '../entity/tarefas/tarefas.entity';
import { Comment } from '../entity/Comment/comment.entity';
import { DataSource } from 'typeorm';
import { Password } from 'src/entity/Password/password.entity';

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
        entities: [Tarefas, User, Post, Comment, Password],
        subscribers: [],
        migrations: [],
      });

      return dataSource.initialize();
    },
  },
];

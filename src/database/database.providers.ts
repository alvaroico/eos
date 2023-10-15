// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Post } from '../entity/Post/post.entity';
import { User } from '../entity/User/user.entity';
import { Tarefas } from '../entity/tarefas/tarefas.entity';
import { Comment } from '../entity/Comment/comment.entity';
import { DataSource } from 'typeorm';
import { Password } from 'src/entity/Password/password.entity';
console.log(process.env);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT
          ? parseInt(process.env.POSTGRES_PORT)
          : 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
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

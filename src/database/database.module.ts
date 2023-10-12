import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserProviders } from './Entidades/User/user.providers';
import { TarefasProviders } from './Entidades/tarefas/tarefas.providers';
import { PostProviders } from './Entidades/Post/post.providers';

@Module({
  providers: [
    ...databaseProviders,
    ...TarefasProviders,
    ...UserProviders,
    ...PostProviders,
  ],
  exports: [
    ...databaseProviders,
    ...TarefasProviders,
    ...UserProviders,
    ...PostProviders,
  ],
})
export class DatabaseModule {}

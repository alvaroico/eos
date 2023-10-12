import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserProviders } from '../entity/User/user.providers';
import { TarefasProviders } from '../entity/tarefas/tarefas.providers';
import { PostProviders } from '../entity/Post/post.providers';
import { CommentProviders } from '../entity/Comment/comment.providers';

@Module({
  providers: [
    ...databaseProviders,
    ...TarefasProviders,
    ...UserProviders,
    ...PostProviders,
    ...CommentProviders,
  ],
  exports: [
    ...databaseProviders,
    ...TarefasProviders,
    ...UserProviders,
    ...PostProviders,
    ...CommentProviders,
  ],
})
export class DatabaseModule {}

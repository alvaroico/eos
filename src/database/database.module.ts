import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UsersProviders } from './Entidades/User/users.providers';
import { TarefasProviders } from './Entidades/tarefas/tarefas.providers';

@Module({
  providers: [...databaseProviders, ...TarefasProviders, ...UsersProviders],
  exports: [...databaseProviders, ...TarefasProviders, ...UsersProviders],
})
export class DatabaseModule {}

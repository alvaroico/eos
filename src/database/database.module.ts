import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserProviders } from './Entidades/User/user.providers';
import { TarefasProviders } from './Entidades/tarefas/tarefas.providers';

@Module({
  providers: [...databaseProviders, ...TarefasProviders, ...UserProviders],
  exports: [...databaseProviders, ...TarefasProviders, ...UserProviders],
})
export class DatabaseModule {}

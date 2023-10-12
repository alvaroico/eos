import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TarefasService } from './database/Entidades/tarefas/tarefas.service';
import { TarefasController } from './database/Entidades/tarefas/tarefas.controller';
import { UsersController } from './database/Entidades/User/users.controller';
import { UsersService } from './database/Entidades/User/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, TarefasController, UsersController],
  providers: [AppService, TarefasService, UsersService],
})
export class AppModule {}

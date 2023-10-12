import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TarefasService } from './database/Entidades/tarefas/tarefas.service';
import { TarefasController } from './database/Entidades/tarefas/tarefas.controller';
import { UserController } from './database/Entidades/User/user.controller';
import { UserService } from './database/Entidades/User/user.service';
import { PostController } from './database/Entidades/Post/post.controller';
import { PostService } from './database/Entidades/Post/post.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    TarefasController,
    UserController,
    PostController,
  ],
  providers: [AppService, TarefasService, UserService, PostService],
})
export class AppModule {}

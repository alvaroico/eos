import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TarefasService } from './entity/tarefas/tarefas.service';
import { TarefasController } from './entity/tarefas/tarefas.controller';
import { UserController } from './entity/User/user.controller';
import { UserService } from './entity/User/user.service';
import { PostController } from './entity/Post/post.controller';
import { PostService } from './entity/Post/post.service';
import { CommentController } from './entity/Comment/comment.controller';
import { CommentService } from './entity/Comment/comment.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  controllers: [
    AppController,
    TarefasController,
    UserController,
    PostController,
    CommentController,
  ],
  providers: [
    AppService,
    TarefasService,
    UserService,
    PostService,
    CommentService,
  ],
})
export class AppModule {}

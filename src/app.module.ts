import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from './entity/User/user.controller';
import { UserService } from './entity/User/user.service';
import { PostController } from './entity/Post/post.controller';
import { PostService } from './entity/Post/post.service';
import { CommentController } from './entity/Comment/comment.controller';
import { CommentService } from './entity/Comment/comment.service';
import { JwtModule } from '@nestjs/jwt';
import { FeedService } from './entity/feed/feed.service';
import { FeedController } from './entity/feed/feed.controller';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  controllers: [
    AppController,
    UserController,
    PostController,
    CommentController,
    FeedController,
  ],
  providers: [
    AppService,
    UserService,
    PostService,
    CommentService,
    FeedService,
  ],
})
export class AppModule {}

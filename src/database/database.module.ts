import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserProviders } from '../entity/User/user.providers';
import { PostProviders } from '../entity/Post/post.providers';
import { CommentProviders } from '../entity/Comment/comment.providers';
import { PasswordProviders } from 'src/entity/Password/password.providers';

const importedProvidersExported = [
  ...databaseProviders,
  ...UserProviders,
  ...PostProviders,
  ...CommentProviders,
  ...PasswordProviders,
];

@Module({
  providers: importedProvidersExported,
  exports: importedProvidersExported,
})
export class DatabaseModule {}

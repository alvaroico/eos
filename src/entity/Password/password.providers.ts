import { DataSource } from 'typeorm';
import { Password } from './password.entity';

export const PasswordProviders = [
  {
    provide: 'PASSWORD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Password),
    inject: ['DATA_SOURCE'],
  },
];

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User/user.entity';

@Entity()
export class Post {
  constructor(userId: number, title: string, description: string, id?: number) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;
}

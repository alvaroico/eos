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
  constructor(
    user_id: number,
    title: string,
    description: string,
    views: number,
    likes: number,
    dislikes: number,
    id?: number,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Column({ nullable: false })
  user_id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  views: number;

  @Column({ nullable: true })
  likes: number;

  @Column({ nullable: true })
  dislikes: number;
}

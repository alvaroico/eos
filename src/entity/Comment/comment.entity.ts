import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User/user.entity';
import { Post } from '../Post/post.entity';

@Entity()
export class Comment {
  constructor(
    user_id: number,
    post_id: number,
    description: string,
    id?: number,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
    this.description = description;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Column({ nullable: false })
  user_id: number;

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  @Column({ nullable: false })
  post_id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_deleted_at' })
  @Column({
    nullable: true,
  })
  user_deleted_at: number;
}

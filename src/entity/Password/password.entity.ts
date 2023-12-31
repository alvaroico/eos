import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '../User/user.entity';

@Entity()
export class Password {
  constructor(password: string, user_id: number) {
    this.user_id = user_id;
    this.password = password;
  }

  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ length: 100 })
  password: string;
}

import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  constructor(name: string, email: string, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Unique('email', ['email'])
  @Column({ length: 191 })
  email: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  constructor(name: string, email: string, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;
}

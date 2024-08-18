import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Task } from '../task/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { UserModule } from './user/user.module';
import { TasksModule } from './task/task.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'task_manager',
      entities: [User, Task],
      synchronize: true,
    }),
    UserModule,
    TasksModule,
  ],
})
export class AppModule {}

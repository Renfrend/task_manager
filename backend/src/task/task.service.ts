import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { ReorderTaskItemDto } from './dto/reorder-task-item.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: {
        user: { id: userId },
      },

      order: { order: 'asc' },
    });
  }

  create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create({
      title: createTaskDto.title,
      status: createTaskDto.status,
      text: createTaskDto.text,
      order: createTaskDto.order,
      user: { id: userId },
    });

    return this.tasksRepository.save(newTask);
  }

  async update(userId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({
      id: updateTaskDto.id,
      user: { id: userId },
    });

    if (!task) {
      throw new NotFoundException();
    }

    task.title = updateTaskDto.title;
    task.text = updateTaskDto.text;
    task.status = updateTaskDto.status;

    return this.tasksRepository.save(task);
  }

  async reorder(userId: number, reorderTaskItemsDto: ReorderTaskItemDto[]) {
    const ids = reorderTaskItemsDto.map((item) => item.id);

    const tasks = await this.tasksRepository.find({
      where: { id: In(ids), user: { id: userId } },
      select: { id: true, order: true },
    });

    for (const task of tasks) {
      const taskDto = reorderTaskItemsDto.find((item) => item.id === task.id);

      if (taskDto) {
        task.status = taskDto.status;
        task.order = taskDto.order;
      }
    }

    await this.tasksRepository.save(tasks);
  }

  async delete(userId: number, taskId: number): Promise<void> {
    await this.tasksRepository.delete({ id: taskId, user: { id: userId } });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import { AtGuard } from '../user/guards/at.guard';
import { RequestWithUser } from '../user/interfaces/request-with-user.interface';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTaskItemDto } from './dto/reorder-task-item.dto';

@UseGuards(AtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.taskService.findAll(request.user.id);
  }

  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(request.user.id, createTaskDto);
  }

  @Put()
  update(
    @Req() request: RequestWithUser,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(request.user.id, updateTaskDto);
  }

  @Patch()
  reorder(
    @Req() request: RequestWithUser,
    @Body() reorderTaskItemsDto: ReorderTaskItemDto[],
  ) {
    return this.taskService.reorder(request.user.id, reorderTaskItemsDto);
  }

  @Delete(':id')
  delete(@Req() request: RequestWithUser, @Param('id') taskId: number) {
    return this.taskService.delete(request.user.id, taskId);
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { FindOneParams } from './dto/param.dto';

@Controller('')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  // Create
  @Post('create')
  async createTodoInvConfig(@Body() dto: CreateTodoDto) {
    const result = await this.TodoService.create(dto);
    console.log('result', result);
    return result;
  }

  // Update
  @Put('update/:id')
  async updateTodo(
    @Body()
    dto: CreateTodoDto,
    @Param() params: FindOneParams,
  ) {
    return this.TodoService.update(Number(params.id), dto);
  }

  // Delete one
  @Delete('delete/:id')
  async deleteOne(@Param() params: FindOneParams) {
    return this.TodoService.delete({ id: Number(params.id) });
  }

  // Delete all
  @Delete('delete')
  async deleteAll() {
    return this.TodoService.deleteAll();
  }

  // Get all
  @Get('get')
  async getAll() {
    return this.TodoService.all({});
  }

  // Get one
  @Get('get/:id')
  async get(@Param() params: FindOneParams) {
    return this.TodoService.get({ id: Number(params.id) });
  }
}

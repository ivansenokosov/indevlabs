import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTodoDto } from './dto/createTodo.dto';
import type { IResponse } from 'src/interfaces';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async get(
    postWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<IResponse | null> {
    const result = await this.prisma.todo.findUnique({
      where: postWhereUniqueInput,
    });
    return { success: true, result: { todos: [result] } };
  }

  async all(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<IResponse> {
    const { skip, take, cursor, where, orderBy } = params;
    const result = await this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return { success: true, result: { todos: result } };
  }

  async create(todo: CreateTodoDto): Promise<IResponse> {
    let result: IResponse;
    try {
      const response = await this.prisma.todo.create({
        data: {
          todo: todo.todo,
          done: todo.done,
        },
        select: {
          id: true,
        },
      });
      result = { success: true, result: { id: response.id } };
    } catch (error) {
      result = { success: false, result: { error: error } };
    }

    return result;
  }

  async update(id: number, dto: CreateTodoDto) {
    const todo = await this.prisma.todo.update({
      data: dto,
      where: { id: id },
    });

    return { success: true, result: todo };
  }

  async delete(where: Prisma.TodoWhereUniqueInput) {
    const result = await this.prisma.todo.delete({
      where,
    });
    return { success: true, result };
  }

  async deleteAll() {
    await this.prisma.todo.deleteMany();
    return { success: true };
  }
}

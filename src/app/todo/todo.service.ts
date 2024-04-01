import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ){} 

    async findAll(): Promise<TodoEntity[] | null>{
        return await this.todoRepository.find();
    }

    async findOne(id: number): Promise<TodoEntity | null> {
        try {
            return await this.todoRepository.findOneBy({
                id: id
            })
        }catch(error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateTodoDto): Promise<TodoEntity> {
        return await this.todoRepository.save(
            this.todoRepository.create(data)
        );
    }

    async update(id: number, data: UpdateTodoDto): Promise<TodoEntity | null> {
        const todo = await this.todoRepository.findOne({
                where: {
                    id: Number(id)
                }
            });

        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo);
    }

    async remove(id: number): Promise<void> {
        await this.todoRepository.findOne({
            where: {
                id: Number(id)
            }
        });
        await this.todoRepository.softDelete(id)
    }
}

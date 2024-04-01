import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
    
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ){} 

    async findAll() {
        return await this.todoRepository.find();
    }

    async findOne(id: number) {
        try {
            return await this.todoRepository.findOneBy({
                id: id
            })
        }catch(error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data) {
        return await this.todoRepository.save(this.todoRepository.create(data));
    }

    async update(id: number, data) {
        const todo = await this.todoRepository.findOne({where: {id: Number(id)}});

        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo);
    }

    async remove(id: number) {
        await this.todoRepository.findOne({where: {id: Number(id)}});

        await this.todoRepository.softDelete(id)
    }
}

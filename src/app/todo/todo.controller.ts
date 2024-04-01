import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Get()
    async index() {
        return await this.todoService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return await this.todoService.findOne(id)
    }
    
    @Post()
    async create(@Body() body) {
        return await this.todoService.create(body);
    }
    
    @Put(':id')
    async update(@Param('id') id:number, @Body() body) {
        return await this.todoService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id') id:number) {
        try {
            await this.todoService.remove(id);
        } catch (error) {
            console.error('Erro ao excluir o todo:', error);
            throw new Error('Erro ao excluir o todo');
        }
    }
}

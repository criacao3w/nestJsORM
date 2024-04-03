import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { ShowTodoSwagger } from './swagger/show-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { DestroyTodoSwagger } from './swagger/destroy-todo.swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Listar todas as tasks' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de tasks',
        type: IndexTodoSwagger,
        isArray: true,
    })
    async index() {
        return await this.todoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Exibe detalhes de uma task pelo ID' })
    @ApiResponse({ status: 200, description: 'Detalhes de uma task encontrada com sucesso' })
    @ApiResponse({ 
        status: 404, 
        description: 'Task não encontrada',
        type: ShowTodoSwagger,
    })
    async show(@Param('id') id: number) {
        return await this.todoService.findOne(id)
    }
    
    @Post()
    @ApiOperation({ summary: 'Adiciona e salva uma única tarefa' })
    @ApiResponse({ 
        status: 201, 
        description: 'Nova task criada com sucesso',
        type: CreateTodoSwagger,
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Parâmetros inválidos'
    })
    async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body);
    }
    
    @Put(':id')
    @ApiOperation({ summary: 'Atualiza uma tarefa pelo ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Task atualizada com sucesso',
        type: UpdateTodoSwagger,
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Task não encontrada'
    })
    async update(@Param('id') id:number, @Body() body: UpdateTodoDto) {
        return await this.todoService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Exclui tarefas usando o ID' })
    @ApiResponse({ 
        status: 204, 
        description: 'Task removida com sucesso',
        type: DestroyTodoSwagger,
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Task não encontrada'
    })
    async destroy(@Param('id') id:number) {
        try {
            await this.todoService.remove(id);
        } catch (error) {
            console.error('Erro ao excluir o todo:', error);
            throw new Error('Erro ao excluir o todo');
        }
    }
}

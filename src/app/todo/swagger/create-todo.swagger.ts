import { ApiProperty } from "@nestjs/swagger";
import { TodoEntity } from "../entity/todo.entity";

export class CreateTodoSwagger extends TodoEntity {}
import { ApiProperty } from "@nestjs/swagger";
import { TodoEntity } from "../entity/todo.entity";

// Option 1
export class IndexTodoSwagger extends TodoEntity {}

// Option 2
/* export class IndexTodoSwagger {
    @ApiProperty({
        type: TodoEntity,
        isArray: true,
    })
    items: TodoEntity[];
} */

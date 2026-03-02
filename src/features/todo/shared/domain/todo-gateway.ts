import type { CreateTodo } from "../../create/domain/create-todo-model";
import type { Todo } from "../../list/domain/todo-model";

export interface TodoGateway {
    createTodo: (todo: CreateTodo) => Promise<void>;
    listTodos: () => Promise<Todo[]>;
}
    
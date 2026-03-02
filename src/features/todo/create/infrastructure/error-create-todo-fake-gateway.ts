import type { CreateTodo } from "../domain/create-todo-model";
import type { Todo } from "../../list/domain/todo-model";
import type { TodoGateway } from "../../shared/domain/todo-gateway";

export class ErrorCreateTodoFakeGateway implements TodoGateway {
    async createTodo(_: CreateTodo): Promise<void> {
        return Promise.reject(new Error('Error creating todo'));
    }

    async listTodos(): Promise<Todo[]> {
        return Promise.resolve([]);
    }
}

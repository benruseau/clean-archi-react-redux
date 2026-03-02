import type { Todo } from "../../list/domain/todo-model";
import type { TodoGateway } from "../../shared/domain/todo-gateway";
import type { CreateTodo } from "../domain/create-todo-model";

export class SuccessCreateTodoFakeGateway implements TodoGateway {
    async createTodo(_: CreateTodo): Promise<void> {
        return Promise.resolve();
    }

    async listTodos(): Promise<Todo[]> {
        return Promise.resolve([]);
    }
}

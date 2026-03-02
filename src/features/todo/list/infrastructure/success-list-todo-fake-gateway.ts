import type { CreateTodo } from "../../create/domain/create-todo-model";
import type { Todo } from "../domain/todo-model";
import type { TodoGateway } from "../../shared/domain/todo-gateway";

export class SuccessListTodoFakeGateway implements TodoGateway {
    private readonly fakeTodos: Todo[] = [];

    async createTodo(_: CreateTodo): Promise<void> {
        return Promise.resolve();
    }

    async listTodos(): Promise<Todo[]> {
        return Promise.resolve(this.fakeTodos);
    }
}

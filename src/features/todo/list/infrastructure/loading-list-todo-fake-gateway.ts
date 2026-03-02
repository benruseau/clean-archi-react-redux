import type { CreateTodo } from "../../create/domain/create-todo-model";
import type { Todo } from "../domain/todo-model";
import type { TodoGateway } from "../../shared/domain/todo-gateway";

export class LoadingListTodoFakeGateway implements TodoGateway {
    async createTodo(_: CreateTodo): Promise<void> {
        return Promise.resolve();
    }

    async listTodos(): Promise<Todo[]> {
        return new Promise(() => {});
    }
}

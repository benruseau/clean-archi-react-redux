import type { CreateTodo } from "../../create/domain/create-todo-model";
import type { Todo } from "../../list/domain/todo-model";
import type { TodoGateway } from "../domain/todo-gateway";

export class InMemoryTodoGateway implements TodoGateway {
    private todos: Todo[] = [];

    async createTodo(todo: CreateTodo): Promise<void> {
        this.todos.push({ id: crypto.randomUUID(), ...todo });
    }

    async listTodos(): Promise<Todo[]> {
        return [...this.todos];
    }
}

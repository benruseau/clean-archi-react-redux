import type { AppThunk } from "../../../shared/domain/store";
import type { TodoGateway } from "../../shared/domain/todo-gateway";
import type { CreateTodo } from "../domain/create-todo-model";
import { creationFailed, creationReset, creationStarted, creationSuccess } from "../domain/create-todo.state";

const RESET_DELAY_MS = 2000;

export const createTodoUseCase = (todo: CreateTodo): AppThunk => async (dispatch, _, {todoGateway}: {todoGateway: TodoGateway}) => {
    try {
        dispatch(creationStarted());
        await todoGateway.createTodo(todo);
        dispatch(creationSuccess());
    } catch (error) {
        dispatch(creationFailed(error instanceof Error ? error.message : 'Unknown error'));
    } finally {
        setTimeout(() => dispatch(creationReset()), RESET_DELAY_MS);
    }
}

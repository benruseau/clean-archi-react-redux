import type { AppThunk } from "../../../shared/domain/store";
import type { TodoGateway } from "../../shared/domain/todo-gateway";
import { listingFailed, listingStarted, listingSuccess } from "../domain/list-todo.state";

export const listTodoUseCase = (): AppThunk => async (dispatch, _, { todoGateway }: { todoGateway: TodoGateway }) => {
    try {
        dispatch(listingStarted());
        const todos = await todoGateway.listTodos();
        dispatch(listingSuccess(todos));
    } catch (error) {
        dispatch(listingFailed(error instanceof Error ? error.message : 'Unknown error'));
    }
};

import { useSelector } from "react-redux";
import { getStatusSelector, getTodosSelector, getErrorSelector } from "../domain/list-todo.state";

export const useListTodoViewModel = () => {
    const status = useSelector(getStatusSelector);
    const todos = useSelector(getTodosSelector);
    const error = useSelector(getErrorSelector);

    return {
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
        todos,
        error,
    };
};

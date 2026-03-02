import { useSelector } from "react-redux";
import { getStatusSelector, getErrorSelector } from "../domain/create-todo.state";

export const useCreateTodoViewModel = () => {
    const status = useSelector(getStatusSelector);
    const error = useSelector(getErrorSelector);

    return {
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
        error,
    };
};

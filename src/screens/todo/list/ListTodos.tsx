import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listTodoUseCase } from "../../../features/todo/list/application/list-todo-use-case";
import { useListTodoViewModel } from "../../../features/todo/list/presentation/list-todo-view-model";
import type { AppStore } from "../../../features/shared/domain/store";

export const ListTodos = () => {
    const dispatch = useDispatch<AppStore['dispatch']>();
    const { isLoading, isError, todos, error } = useListTodoViewModel();

    useEffect(() => {
        dispatch(listTodoUseCase());
    }, [dispatch]);

    if (isLoading) return <p>Loading todos...</p>;
    if (isError) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Todos</h2>
            {todos.length === 0 ? (
                <p>No todos yet.</p>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>{todo.description}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

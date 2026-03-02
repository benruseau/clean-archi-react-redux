import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodoUseCase } from "../../../features/todo/create/application/create-todo-use-case";
import { listTodoUseCase } from "../../../features/todo/list/application/list-todo-use-case";
import { useCreateTodoViewModel } from "../../../features/todo/create/presentation/create-todo-view-model";
import type { AppStore } from "../../../features/shared/domain/store";

export const CreateTodo = () => {
    const [description, setDescription] = useState('');
    const dispatch = useDispatch<AppStore['dispatch']>();
    const { isLoading, isSuccess, isError, error } = useCreateTodoViewModel();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!description.trim()) return;
        await dispatch(createTodoUseCase({ description }));
        dispatch(listTodoUseCase());
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Todo</h2>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What needs to be done?"
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Add Todo'}
            </button>
            {isSuccess && <p>Todo created successfully!</p>}
            {isError && <p>Error: {error}</p>}
        </form>
    );
};

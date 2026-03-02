import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "./todo-model";

type ListTodoState = {
    status: 'idle' | 'loading' | 'success' | 'error';
    todos: Todo[];
    error: string | null;
};

export const listTodoSlice = createSlice({
    name: 'listTodo',
    initialState: {
        status: 'idle',
        todos: [],
        error: null,
    } as ListTodoState,
    reducers: {
        listingStarted: (state: ListTodoState) => {
            state.status = 'loading';
        },
        listingSuccess: (state: ListTodoState, action: PayloadAction<Todo[]>) => {
            state.status = 'success';
            state.todos = action.payload;
        },
        listingFailed: (state: ListTodoState, action: PayloadAction<string>) => {
            state.status = 'error';
            state.error = action.payload;
        },
    },
});

export const { listingStarted, listingSuccess, listingFailed } = listTodoSlice.actions;
export const listTodoReducer = listTodoSlice.reducer;

export const getStatusSelector = (state: { listTodo: ListTodoState }) => state.listTodo.status;
export const getTodosSelector = (state: { listTodo: ListTodoState }) => state.listTodo.todos;
export const getErrorSelector = (state: { listTodo: ListTodoState }) => state.listTodo.error;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CreateTodoState = {
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
};

export const createTodoSlice = createSlice({
    name: 'createTodo',
    initialState: {
        status: 'idle',
        error: null,
    } as CreateTodoState,
    reducers: {
        creationStarted: (state: CreateTodoState) => {
            state.status = 'loading';
        },
        creationSuccess: (state: CreateTodoState) => {
            state.status = 'success';
        },
        creationFailed: (state: CreateTodoState, action: PayloadAction<string>) => {
            state.status = 'error';
            state.error = action.payload;
        },
        creationReset: (state: CreateTodoState) => {
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const {creationStarted, creationSuccess, creationFailed, creationReset} = createTodoSlice.actions;
export const createTodoReducer = createTodoSlice.reducer;

export const getStatusSelector = (state: { createTodo: CreateTodoState }) => state.createTodo.status;
export const getErrorSelector = (state: { createTodo: CreateTodoState }) => state.createTodo.error;

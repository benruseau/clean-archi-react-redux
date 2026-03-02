import { configureStore, type Action, type ThunkAction, type ThunkDispatch } from "@reduxjs/toolkit";
import { createTodoReducer } from "../../todo/create/domain/create-todo.state";
import { listTodoReducer } from "../../todo/list/domain/list-todo.state";
import type { TodoGateway } from "../../todo/shared/domain/todo-gateway";

export type Middlewares = {
    todoGateway: TodoGateway;
};

export const initReduxStore = (middlewares: Partial<Middlewares>) => configureStore({
    reducer: {
        createTodo: createTodoReducer,
        listTodo: listTodoReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            thunk: {
                extraArgument: middlewares
            }
        })
});

export type RootState = ReturnType<typeof initReduxStore>['getState'];

export type AppStore = ReturnType<typeof initReduxStore> & {
    dispatch: ThunkDispatch<RootState, Middlewares, Action>;
};

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    Middlewares,
    Action
>;

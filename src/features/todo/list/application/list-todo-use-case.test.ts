import { listTodoUseCase } from "./list-todo-use-case";
import { LoadingListTodoFakeGateway } from "../infrastructure/loading-list-todo-fake-gateway";
import { initReduxStore, type AppStore } from "../../../shared/domain/store";
import { SuccessListTodoFakeGateway } from "../infrastructure/success-list-todo-fake-gateway";
import { ErrorListTodoFakeGateway } from "../infrastructure/error-list-todo-fake-gateway";

describe('As a user, I want to list todos', () => {

    describe('Given no listing has started', () => {

        describe('When listing has not been triggered', () => {
            const store: AppStore = initReduxStore({});
            test('Then the status should be idle', () => {
                expect(store.getState().listTodo.status).toBe('idle');
            });

            test('Then the todos should be empty', () => {
                expect(store.getState().listTodo.todos).toEqual([]);
            });
        });

        describe('When listing has started', () => {

            test('Then the status should be loading', () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new LoadingListTodoFakeGateway()
                });
                store.dispatch(listTodoUseCase());
                expect(store.getState().listTodo.status).toBe('loading');
            });
        });

        describe('When listing has succeeded', () => {
            const fakeTodos = [
                { id: '1', description: 'Buy milk' },
                { id: '2', description: 'Walk the dog' },
            ];

            test('Then the status should be success', async () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new SuccessListTodoFakeGateway(fakeTodos)
                });
                await store.dispatch(listTodoUseCase());
                expect(store.getState().listTodo.status).toBe('success');
            });

            test('Then the todos should be returned', async () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new SuccessListTodoFakeGateway(fakeTodos)
                });
                await store.dispatch(listTodoUseCase());
                expect(store.getState().listTodo.todos).toEqual(fakeTodos);
            });
        });

        describe('When listing has failed', () => {

            test('Then the status should be error', async () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new ErrorListTodoFakeGateway()
                });
                await store.dispatch(listTodoUseCase());
                expect(store.getState().listTodo.status).toBe('error');
                expect(store.getState().listTodo.error).toBe('Error listing todos');
            });
        });
    });
});

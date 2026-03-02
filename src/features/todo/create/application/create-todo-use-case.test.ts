import { createTodoUseCase } from "./create-todo-use-case";
import { LoadingCreateTodoFakeGateway } from "../infrastructure/loading-create-todo-fake-gateway";
import { initReduxStore, type AppStore } from "../../../shared/domain/store";
import { SuccessCreateTodoFakeGateway } from "../infrastructure/success-create-todo-fake-gateway";
import { ErrorCreateTodoFakeGateway } from "../infrastructure/error-create-todo-fake-gateway";

describe('As a user, I want to add a todo', () => {

    describe('Given no todo already exists', () => {

        describe('When todo creation has not started', () => {
            const store: AppStore = initReduxStore({});
            test('Then the status should be idle', () => {
                expect(store.getState().createTodo.status).toBe('idle');
            });
        });

        describe('When todo creation has started', () => {

            test('Then the status should be loading', () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new LoadingCreateTodoFakeGateway()
                });
                store.dispatch(createTodoUseCase({description: 'test'}));
                expect(store.getState().createTodo.status).toBe('loading');
            });
        });

        describe('When todo creation has succeeded', () => {

            test('Then the status should be success', async () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new SuccessCreateTodoFakeGateway()
                });
                await store.dispatch(createTodoUseCase({description: 'test'}));
                expect(store.getState().createTodo.status).toBe('success');
            });
        });

        describe('When todo creation has failed', () => {

            test('Then the status should be error', async () => {
                const store: AppStore = initReduxStore({
                    todoGateway: new ErrorCreateTodoFakeGateway()
                });
                await store.dispatch(createTodoUseCase({description: 'test'}));
                expect(store.getState().createTodo.status).toBe('error');
                expect(store.getState().createTodo.error).toBe('Error creating todo');
            });
        });
    });
});

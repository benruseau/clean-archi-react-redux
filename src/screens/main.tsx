import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { initReduxStore } from '../features/shared/domain/store.ts'
import { InMemoryTodoGateway } from '../features/todo/shared/infrastructure/in-memory-todo-gateway.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={initReduxStore({ todoGateway: new InMemoryTodoGateway() })}>
      <App />
    </Provider>
  </StrictMode>,
)

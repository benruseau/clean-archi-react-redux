import './App.css'
import { CreateTodo } from './todo/create/CreateTodo'
import { ListTodos } from './todo/list/ListTodos'

function App() {
  return (
    <>
      <h1>Todo App</h1>
      <CreateTodo />
      <ListTodos />
    </>
  )
}

export default App

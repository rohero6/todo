import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Toaster } from 'react-hot-toast'
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div >
      <AddTodo />
      <TodoList />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { ToDoList } from './Components/ToDoList.js';
import { TaskList } from './Components/TaskList.js';

function App() {
  return (
    <><div>
      <ToDoList />
      <TaskList />
    </div>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { ToDoList } from './Components/ToDoList.js';
import { SimpleToDoList } from './Components/SimpleToDoList.js';

function App() {
  return (
    <><div>
      <ToDoList />
      <SimpleToDoList />
    </div>
    </>
  );
}

export default App;

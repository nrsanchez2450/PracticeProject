import './App.css';
import './AddTask.jsx';
import './Item.jsx';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState([])
  
  const  getItem =  (item)  => {
    setTask((prevState) =>{
      return [...prevState, item]
    })
  }
  
  return (
    <div className="To-Do App">
    <AddTask item= {getItem}/>
  {task && task.map((task, index) =>(
    <Item id={index} todo = {task}/>
       ))}
      <header className="App-header">
    <h1> To-Do List </h1>
        
      </header>
    </div>
  );
}

export default App;

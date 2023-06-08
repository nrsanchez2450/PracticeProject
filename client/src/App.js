import React, {useState} from 'react';
import './App.css';

function App() {

const[newItem, setNewItem] = useState("");
const[items, setItems] = useState([]);
const[tasksRemaining, setTasksRemaining] = useState(0);

    
  const handleComplete = (id) => {
    let list = items.map((item) => {
      let index = {};
      if (item.id === id) {
        if (!item.complete) {
          setTasksRemaining(tasksRemaining + 1);
        } else {
          setTasksRemaining(tasksRemaining - 1);
        }
        index = {...item, complete: !item.complete};
      } else index = {...item };

      return index;
    });
    setItems(list);
  };  
    

const DeleteAll = () => {
    setItems([])

  }
  
  
 const addItem = () => {
    
    if(!newItem) {
    
    } else {

     setItems([... items, setNewItem]);
    setNewItem('')
    }
  }
  
  const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem
    };

      setItems(oldList => [...oldList, item]);
      setNewItem("");

      console.log(items);
  
  return (
      <div className="To-Do App">
      <header className="App-header">
        <h1> To-Do List</h1>
    
      <input type = "text" placeholder = "Enter task" value = {newItem}
        onChange= {(e) => setNewItem(e.target.value)}/>
      <button type = "submit" onClick= {() => addItem()}> Add </button>
      <button onClick={() => DeleteAll()}>Clear All</button>

    <ul>
          {items.map(item => {
            return(
              <li key={item.id}>{item.value}<input type = "checkbox" onClick={() => handleComplete(item.id)}></li>
            )
          })}
        </ul>
      </header>
    </div>
    
    );
  
}

export default App;

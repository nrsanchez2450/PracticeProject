import React, {useState} from 'react';
import './App.css';

function App() {

const[newItem, setNewItem] = useState("");
const[items, setItems] = useState([]);
const [count, setCount] = useState(0);

const DeleteAll = () => {
    setItems([])
    setCount(0)

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
              <li key={item.id}>{item.value}<input type = "checkbox"></li>
            )
          })}
        </ul>
      </header>
    </div>
    
    );
  
}

export default App;

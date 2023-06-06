import React, {useState} from 'react';
import from '/App.css'

const Todo = () => {
  
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  
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
    <div className = "addTasks">
      <input type = "checkbox" placeholder = "Enter task" value = {newItem}
        onChange= {(e) => setNewItem(e.target.value)}/>
      <button type = "submit" onClick= {() => addItem()}> Add </button>

    <ul>
          {items.map(item => {
            return(
              <li key={item.id}>{item.value}</li>
            )
          })}
        </ul>
  
    </div>
  );
}
export default Todo;

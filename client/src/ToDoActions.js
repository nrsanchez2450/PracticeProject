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
  
  return (
    <div className = "addTasks">
      <input type = "checkbox" placeholder = "Enter task" value = {newItem}
        onChange= {(e) => setNewItem(e.target.value)}/>
      <button type = "submit" onClick= {() => addItem()}> Add </button>
  
    </div>
  )
export default Todo;

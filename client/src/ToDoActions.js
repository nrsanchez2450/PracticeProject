import React, {useState} from 'react';
import from '/App.css'

const Todo = () => {
  
  const [newItem, setNewItem] = useState('');
  
  return (
    <div className = "addTasks">
      <input type = "text" placeholder = "Enter task" value = {newItem}
        onChange= {(e) => setNewItem(e.target.value)}
    
    </div>
    
    <div className = "clear all">
    <button className = "clear-all-btn"> Clear All Tasks </button>
    </div>

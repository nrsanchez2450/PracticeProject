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



  function addItem(){

    if(!newItem){
      alert("Please enter a task.")
      return;
    }



    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem
    };

      setItems(oldList => [...oldList, item]);
      setNewItem("");

      console.log(items);

  }

  return (
      <div className='App'>
      <header className="App-header">
        <h1> Daily To-Do List</h1>
        <p> {items.length - tasksRemaining} daily tasks left. </p>

        <input
        type= "text"
        placeholder= 'Add task'
        value= {newItem}
        onChange={e => setNewItem(e.target.value)}
        />
        <button onClick={() => addItem()}>Add</button>
        <button onClick={() => DeleteAll()}>Clear All</button>

        <ul>
          {items.map(item => {
            return(
              <li key={item.id}>{item.value}<input type = "checkbox" onClick={() => handleComplete(item.id)}>
                </input> 
            </li>
            )
          })}
        </ul>
      </header>
    </div>
  );
};
export default App;
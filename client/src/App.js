import logo from './logo.svg';
import './App.css';
import './AddTask.jsx';
import './Item.jsx';

function App() {
  const  getItem =  (item)  => {
    console.log(item);
  
  return (
    <div className="To-Do App">
    <AddTask item= {getItem}/>
      <header className="App-header">
    <h1> To-Do List </h1>
        
      </header>
    </div>
  );
}

export default App;

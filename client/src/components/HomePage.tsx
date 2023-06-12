import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { ChangeUserContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  value: string;
  complete: boolean;
}

function HomePage(): JSX.Element {
  const [newItem, setNewItem] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [tasksRemaining, setTasksRemaining] = useState<number>(0);
  const username = useContext(UserContext);
  const navigate = useNavigate();
  const changeUser = useContext(ChangeUserContext);

  useEffect(() => {
    if (!username) {
      navigate("/SignIn");
    }
  }, [username, navigate]);

  const handleItems = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/getTasks', {
        method: "POST",
        body: JSON.stringify({items}),
    })
  };
  

  const handleComplete = (id: number): void => {
    let list: Item[] = items.map((item) => {
      let index: Item = { ...item };
      if (item.id === id) {
        if (!item.complete) {
          setTasksRemaining(tasksRemaining + 1);
        } else {
          setTasksRemaining(tasksRemaining - 1);
        }
        index.complete = !item.complete;
        updateToDB(id);
      }

      return index;
      async function updateToDB(id: number) {
        fetch("/updateTask", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
      }
    });
    setItems(list);
  };

  

  const deleteAll = (): void => {
    setItems([]);
  };

  const addItem = (): void => {
    if (!newItem) {
      return;
    } else {
      const newItemObject: Item = {
        id: Math.floor(Math.random() * 1000),
        value: newItem,
        complete: false,
      };
      setItems((oldList) => [...oldList, newItemObject]);
      setNewItem("");
    }
  };

  const handleSignOut = (): void => {
    changeUser("");
  };

  return (
    <div className="To-Do App">
      <header className="App-header">
        <h1> To-Do List</h1>
        <p> {items.length - tasksRemaining} daily tasks left. </p>

        <input
          type="text"
          placeholder="Enter task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit" onClick={() => addItem()}>
          {" "}
          Add{" "}
        </button>
        <button onClick={() => deleteAll()}>Clear All</button>

        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                {item.value}
                <input
                  type="checkbox"
                  onClick={() => handleComplete(item.id)}
                ></input>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default HomePage;

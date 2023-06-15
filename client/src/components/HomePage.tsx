import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { Button } from "@mui/material";
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
      }

      return index;
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
        <h3> Daily ToDo List</h3>

        <input
          type="text"
          placeholder="Enter task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button variant="contained" onClick={() => addItem()}>
          {" "}
          Add{" "}
        </Button>
        <Button variant = "outlined" onClick={() => deleteAll()}>Clear All</Button>

        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                {item.value}
                <input
                  type="checkbox"
                  onClick={() => handleComplete(item.id)}
                ></input>
             <p> {items.length - tasksRemaining} daily tasks left. </p>
              </li>
            );
          })}
        </ul>
      </header>
      <Button variant = "text" onClick={handleSignOut}>Logout</Button>
    </div>
  );
}

export default HomePage;
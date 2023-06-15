import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import {Button} from '@mui/material';
import { ChangeUserContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  body: string;
  completed: boolean;
}

function HomePage(): JSX.Element {
  const [newItem, setNewItem] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [tasksRemaining, setTasksRemaining] = useState<number>(0);
  const username = useContext(UserContext);
  const navigate = useNavigate();
  const changeUser = useContext(ChangeUserContext);

  // Loading user's task on login
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/getTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });

      if (response.ok) {
        const tasks: Item[] = await response.json();
        setItems(tasks);
      }
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/SignIn");
    }
  }, [username]);

  function addToDB(body: string) {
    fetch("/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username, body: body }),
    });
  }

  const handleComplete = (id: number): void => {
    let list: Item[] = items.map((item) => {
      let index: Item = { ...item };
      if (item.id === id) {
        if (!item.completed) {
          setTasksRemaining(tasksRemaining + 1);
        } else {
          setTasksRemaining(tasksRemaining - 1);
        }
        index.completed = !item.completed;
        updateToDB(id);
      }

      return index;

      async function updateToDB(id: number) {
        fetch("/updateTask", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, completed: true }),
        });
      }
    });
    setItems(list);
  };

  const deleteAll = (): void => {
    setItems([]);
    setTasksRemaining(0);

    fetch("/clearTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username }),
    });
  };

  const addItem = async () => {
    if (!newItem) {
      return;
    } else {
      const response = await fetch("/matchId", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      alert(body.id);
      const newItemObject: Item = {
        id: body.id,
        body: newItem,
        completed: false,
      };
      setItems((oldList) => [...oldList, newItemObject]);
      setNewItem("");
      addToDB(newItemObject.body);
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

          {items.map((item) => {
            return (
              <ul>
              <li key={item.id}>
                <p className={item.completed ? "strikethrough" : ""}>
                  {item.body}
                  {item.id}
                </p>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onClick={() => handleComplete(item.id)}
                ></input>
                <p> {items.length - tasksRemaining} daily tasks left. </p>
              </li>
            );
          })}
        </ul>
      </header>
      <Button variant = 'text' onClick={handleSignOut}>Logout</Button>
    </div>
  );
}

export default HomePage;

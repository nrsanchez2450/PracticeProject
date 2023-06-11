import React, { useEffect, useState, useContext } from "react";
import "./App.css";
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
    if (!username) {
      navigate("/SignIn");
    }
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
  

  // useEffect(() => {
  //   addToDB(newItem, false);
  // }, [items]);

  // function addToDB(body: string, status: boolean) {
  //   fetch("/addTask", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ user: username, body: body, status: status }),
  //   });
  // }

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
      }

      return index;
    });
    setItems(list);
  };

  const deleteAll = (): void => {
    setItems([]);
  };

  const addItem = async () => {
    if (!newItem) {
      return;
    } else {
      const newItemObject: Item = {
        id: Math.floor(Math.random() * 1000),
        body: newItem,
        completed: false,
      };
      setItems((oldList) => [...oldList, newItemObject]);
      setNewItem("");
      // await addToDB(newItem, false);
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
                <p className={item.completed ? "strikethrough" : ""}>
                  {item.body}
                </p>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onClick={() => handleComplete(item.id)}
                ></input>
              </li>
            );
          })}
        </ul>
      </header>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default HomePage;

import React, { createContext, useState } from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

export const UserContext = createContext("");
export const ChangeUserContext = createContext((newUser: string) => {});

function App() {
  const [user, changeUser] = useState("");
  return (
    <React.StrictMode>
      <UserContext.Provider value={user}>
        <ChangeUserContext.Provider value={changeUser}>
          <h4>User: {user}</h4>
          <BrowserRouter>
            <Routes>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/HomePage" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </ChangeUserContext.Provider>
      </UserContext.Provider>
    </React.StrictMode>
  );
}

export default App;

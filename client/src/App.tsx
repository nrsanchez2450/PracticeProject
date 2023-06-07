import React from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/HomePage" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;

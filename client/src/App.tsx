import React from "react";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

function AppContent() {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <HomePage /> : <SignIn />}</>;
}

export default App;

import React, { useState, useContext } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (authContext && authContext.login) {
      await authContext.login({ username, password });
    }
  };

  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <form onSubmit={handleSignIn}>
        <Stack m={"auto"} mt={"12.5%"} width={"40%"} spacing={2.5}>
          <Typography variant="h4">Sign in</Typography>

          <Typography variant="h6">Username</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            placeholder="Enter your username"
          ></TextField>

          <Typography variant="h6">Password</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="••••••••"
          ></TextField>

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Sign In
          </Button>
          <Typography>
            Don't have an account?
            <Link to="/SignUp">
              <Button variant="text" color="secondary">
                Sign up
              </Button>
            </Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
}

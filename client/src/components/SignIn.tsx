import React, { useState, useContext } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSignIn}>
        <Stack m={"auto"} mt={"12.5%"} width={"40%"} spacing={2.5}>
          <Typography variant="h4">Sign in</Typography>

          <div>
            <Typography variant="h6">Username</Typography>
            <TextField
              fullWidth
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              placeholder="Enter your username"
            ></TextField>
          </div>

          <div>
            <Typography variant="h6">Password</Typography>
            <TextField
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="••••••••"
            ></TextField>
          </div>

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Sign In
          </Button>
          <Typography>
            Don't have an account?
            <Link to={"/SignUp"}>
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

import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

export default function SignIn() {
  const [backendData, setBackendData] = useState([{}]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const verifyUser = () => {
    const user = { username, password };
    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({
        user,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <Stack m={"auto"} mt={"12.5%"} width={"40%"} spacing={2.5}>
      <Typography variant="h4">Sign in</Typography>

      <form onSubmit={verifyUser}>
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          onClick={verifyUser}
        >
          Sign In
        </Button>
      </form>

      <Typography>
        Don't have an account?
        <Button variant="text" color="secondary">
          Sign up
        </Button>
      </Typography>
    </Stack>
  );
}

import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

export default function SignUp() {
  return (
    <Stack m={"auto"} mt={"10%"} width={"40%"} spacing={2.5}>
      <Typography variant="h4">Sign in</Typography>
      <div>
        <Typography variant="h6">Username</Typography>
        <TextField
          fullWidth
          required
          placeholder="Enter your username"
        ></TextField>
      </div>
      <div>
        <Typography variant="h6">Password</Typography>
        <TextField fullWidth required placeholder="••••••••"></TextField>
      </div>

      <div>
        <Typography variant="h6">Confirm Password</Typography>
        <TextField fullWidth required placeholder="••••••••"></TextField>
      </div>

      <Button variant="contained" color="secondary" fullWidth>
        Sign Up
      </Button>
      <Typography>
        Don't have an account?
        <Button variant="text" color="secondary">
          Sign In
        </Button>
      </Typography>
    </Stack>
  );
}

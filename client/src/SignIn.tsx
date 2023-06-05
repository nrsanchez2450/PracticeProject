import React from "react";
import {Button, Stack, TextField, Typography} from '@mui/material';


export default function SignIn() {
  return (
    <Stack m={'auto'} mt={'12.5%'} width={'40%'} spacing={2.5}>
      <Typography variant="h4">Sign in</Typography>
      <div>
        <Typography variant="h6">Username</Typography>
        <TextField fullWidth required placeholder="Enter your username"></TextField>
      </div>
      <div><Typography variant="h6">Password</Typography>
      <TextField fullWidth required placeholder="••••••••"></TextField></div>
      
            <Button variant="contained" color="secondary" fullWidth>Sign In</Button>
      <Typography>Don't have an account?<Button variant="text" color="secondary">Sign up</Button></Typography>
    </Stack>
  );
}
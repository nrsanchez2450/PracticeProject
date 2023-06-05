import React from "react";
import {Button, Grid, Stack, TextField, Typography} from '@mui/material';


export default function SignIn() {
  return (
    <Grid container spacing={2.5} justifyContent={'center'} mt={'20%'} className="grid">

      <Grid item xs={7}>
        <Typography variant="h4">Sign in</Typography>
      </Grid>

      <Grid item xs={7}>
        <Typography variant="h6">Username</Typography>
        <TextField fullWidth required placeholder="Enter your username"></TextField>
      </Grid>


      <Grid item xs={7}>
        <div><Typography variant="h6">Password</Typography>
        <TextField fullWidth required placeholder="••••••••"></TextField></div>
      </Grid>

      <Grid item xs={7}><Button variant="contained" color="secondary" fullWidth>Sign In</Button></Grid>

      <Grid item xs={7}>
        <Typography>Don't have an account?<Button variant="text" color="secondary">Sign up</Button></Typography>
      </Grid>

    </Grid>
  );
}
import React from 'react';
import { Grid, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import { Home, ArrowBack } from '@material-ui/icons';

const TopBar = props => (
  <AppBar position="relative">
    <Toolbar variant="dense">
      <Grid container>
        <Grid item>
          {props.inicio && (
            <Button color="inherit" onClick={e => props.history.push('/')}>
              <Home />
              Início
            </Button>
          )}
          {props.voltar && (
            <Button color="inherit" onClick={e => props.history.go(-1)}>
              <ArrowBack />
              Voltar
            </Button>
          )}
        </Grid>
        <Grid xs item>
          <Grid container justify="center">
            <Typography align="center" variant="h6" color="inherit" noWrap>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default TopBar;

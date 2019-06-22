import React from 'react';
import { Grid, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import { Home, ArrowBack } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  title: {
    
  },
  button: {
  }
});

const TopBar = props => {
  const { classes } = props;
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Grid container>
          <Grid item>
            {props.inicio && (
              <Button className={classes.button} color="inherit" onClick={e => props.history.push('/')}>
                <Home />
                Início
              </Button>
            )}
            {props.voltar && (
              <Button className={classes.button} color="inherit" onClick={e => props.history.go(-1)}>
                <ArrowBack />
                Voltar
              </Button>
            )}
          </Grid>
          <Grid xs item>
            <Grid container justify="flex-end">
              <Typography className={classes.title} align="center" variant="h6" color="inherit" noWrap>
                {props.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);

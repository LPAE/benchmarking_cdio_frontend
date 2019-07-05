import React from 'react';
import { Grid, Typography, Button, AppBar, Toolbar, Tooltip } from '@material-ui/core';
import { Home, ArrowBack } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    padding: '1rem'
  },
  title: {
    fontWeight: 500,
  },  
  button: {}
});

const TopBar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        <Grid item xs={2}>
          {props.inicio && (
            <Button className={classes.button} color="inherit" onClick={e => props.history.push('/')}>
              <Tooltip placement="right" title="Início">
                <Home fontSize='large'/>
              </Tooltip>
            </Button>
          )}
          {props.voltar && (
            <Button className={classes.button} color="inherit" onClick={e => props.history.go(-1)}>
              <Tooltip placement="right" title="Voltar">
              <ArrowBack fontSize='large'/>
              </Tooltip>
            </Button>
          )}
        </Grid>
        <Grid xs item>
          <Grid container justify="center">
            <Typography className={classes.title} align="center" variant="h5" color="inherit" noWrap>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TopBar);

import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Grid, Box, Typography, Paper, AppBar, Toolbar } from '@material-ui/core';

import './Main.sass';

const styles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  mainTitle: {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem'
    },
    [theme.breakpoints.up('md')]: {
      letterSpacing: '15px'
    }
  }
});

const AccessButton = props => (
  <div className="accessButton">
    <Button variant="contained" size="large" color={props.color ? props.color : 'primary'} onClick={props.onClick}>
      {props.text}
    </Button>
  </div>
);

// TODO: ADICIONAR TOOLTIP NOS BOTOES

export default withStyles(styles)(
  class Main extends React.Component {
    acessarFerramenta = e => {
      e.preventDefault();
      this.props.history.push(`/access`);
    };

    preencherFerramenta = async e => {
      e.preventDefault();
      this.props.history.push(`/config`);
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Box mt={10}>
              <Typography align="center" variant="h2" className={classes.mainTitle}>
                Benchmarking
              </Typography>
              <Typography align="center" variant="h2" className={classes.mainTitle}>
                CDIO
              </Typography>
            </Box>

            <Grid item xs={12} sm={10} xl={8}>
              <Box my={16} clone>
                <Grid container justify="space-around" alignItems="center">
                  <Grid item >
                    <AccessButton color="secondary" text="Acessar" onClick={this.acessarFerramenta} />
                  </Grid>
                  <Grid item>
                    <AccessButton color="secondary" text="Preencher" onClick={this.preencherFerramenta} />
                  </Grid>
                </Grid>
              </Box>
              <Paper elevation={10}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Box m={5}>
                    <Typography variant="h6" align="center">
                      Como Funciona?
                    </Typography>
                    <Typography variant="body1" align="justify">
                      A Ferramenta Benchmarking está constituída por Notas Explicativas e Questionário, referentes à algumas áreas e seus
                      correspondentes indicadores relacionados com a “Abordagem CDIO”. Cada questão da Ferramenta Benchmarking exige que o
                      avaliador se posicione para uma escolha numa escala entre 1 e 5 em relação aos indicadores apresentados e descritos em
                      cada área, para serem avaliados/medidos.
                    </Typography>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
);

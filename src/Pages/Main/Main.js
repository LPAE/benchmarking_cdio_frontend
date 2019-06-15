import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Grid, Box, Typography, Paper, AppBar, Toolbar } from '@material-ui/core';

import './Main.sass';

const AccessButton = props => (
  <div className="accessButton">
    <Button variant="contained" color="primary" onClick={props.onClick}>
      {props.text}
    </Button>
  </div>
);

export default class Main extends React.Component {
  acessarFerramenta = e => {
    e.preventDefault();
    this.props.history.push(`/access`);
  };

  preencherFerramenta = async e => {
    e.preventDefault();
    this.props.history.push(`/config`);
  };

  render() {
    return (
      <div className="Main">
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={8}>
            <Paper elevation={5}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                  <Box className="MainHeader">
                    <Typography align="center" variant="h3">
                      Benchmarking CDIO
                    </Typography>
                  </Box>
                </Grid>
                <Box mt={4}>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary" align="justify">
                      A Ferramenta Benchmarking está constituída por Notas Explicativas e Questionário, referentes à algumas áreas e seus
                      correspondentes indicadores relacionados com a “Abordagem CDIO”. Cada questão da Ferramenta Benchmarking exige que o
                      avaliador se posicione para uma escolha numa escala entre 1 e 5 em relação aos indicadores apresentados e descritos em
                      cada área, para serem avaliados/medidos.
                    </Typography>
                  </Grid>
                </Box>
                <Box mt={4} clone>
                  <Grid container justify="space-around" alignItems="center">
                    <Grid item>
                      <AccessButton text="Acessar" onClick={this.acessarFerramenta} />
                    </Grid>
                    <Grid item>
                      <AccessButton text="Preencher" onClick={this.preencherFerramenta} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

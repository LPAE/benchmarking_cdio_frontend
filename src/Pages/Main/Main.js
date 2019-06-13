import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Grid, Box, Typography, Paper } from '@material-ui/core';

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
        <Box clone m={5} p={2}>
          <Paper elevation={5}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <div className="MainHeader">
                  <Typography align="center" variant="h3">
                    Benchmarking CDIO
                  </Typography>
                </div>
              </Grid>
              <Grid item m={40}>
                <Typography variant="body1" align="justify">
                  A Ferramenta Benchmarking está constituída por Notas Explicativas e Questionário, referentes à algumas áreas e seus
                  correspondentes indicadores relacionados com a “Abordagem CDIO”. Cada questão da Ferramenta Benchmarking exige que o
                  avaliador se posicione para uma escolha numa escala entre 1 e 5 em relação aos indicadores apresentados e descritos em
                  cada área, para serem avaliados/medidos.
                </Typography>
              </Grid>
              <Grid container justify="space-around" alignItems="center">
                <Grid item>
                  <AccessButton text="Acessar Ferramenta" onClick={this.acessarFerramenta} />
                </Grid>
                <Grid item>
                  <AccessButton text="Preencher Ferramenta" onClick={this.preencherFerramenta} />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </div>
    );
  }
}

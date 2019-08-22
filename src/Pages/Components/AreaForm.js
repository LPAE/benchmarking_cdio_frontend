import React from 'react';
import { Grid, Box, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import RadioForm from './RadioForm';

const styles = theme => ({
  root: {
    background: theme.palette.primary.light,
    padding: theme.spacing(2),
    margin: '10px 0'
  },
  title: {
    marginLeft: '0px'
  },
  subtitle: {
    margin: 'auto',
    color: theme.palette.text.secondary
  }
});

export default withStyles(styles)(
  class AreaForm extends React.Component {
    getIndicador = areaItens => {
      let indicadores = [];
      for (const item of areaItens) {
        indicadores = [...indicadores, item.indicador];
      }
      return indicadores;
    };

    getTextoIndicador = areaItens => {
      let textoIndicador = [];
      for (const item of areaItens) {
        textoIndicador = [...textoIndicador, item.textoIndicador];
      }
      return textoIndicador;
    };

    getDescricao = areaItens => {
      let descricoes = [];
      for (const item of areaItens) {
        const descricao = ['', item.descricao1, item.descricao2, item.descricao3];
        descricoes = [...descricoes, descricao];
      }
      return descricoes;
    };

    render() {
      const { classes, area, state, stateName, mostrarDescricao, onChange, stateMetrica, stateNameMetrica, mostrarMetrica } = this.props;

      return (
        <Paper elevation={4} className={classes.root}>
          <Grid container direction="column" alignItems="stretch" wrap="nowrap">
            <Grid item className={classes.title}>
              <Typography justify="left" variant="h4">
                Área: {area.titulo}
              </Typography>
            </Grid>
            <Grid item className={classes.subtitle}>
              <Typography justify="center" variant="h4">
                Score
              </Typography>
            </Grid>

            <Grid item>
              <RadioForm
                row={this.getIndicador(area.item)}
                header={['Indicador', '1', '2', '3', '4', '5']}
                mostrarDescricao={mostrarDescricao}
                descricao={this.getDescricao(area.item)}
                textoIndicador={this.getTextoIndicador(area.item)}
                state={state}
                stateName={stateName}
                onChangeCallback={onChange}
              />
            </Grid>

            {mostrarMetrica && (
              <>
                <Grid item className={classes.subtitle}>
                  <Box clone pt={2}>
                    <Typography justify="center" variant="h4">
                      Métricas
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ margin: 'auto' }} container direction="row" item xs={12} sm={8} lg={6}>
                  <Grid container direction="column" alignItems="stretch">
                    <RadioForm
                      row={this.getIndicador(area.item)}
                      header={['Indicador', 'Prática', 'Performance']}
                      descricao={this.getDescricao(area.item)}
                      textoIndicador={this.getTextoIndicador(area.item)}
                      state={stateMetrica}
                      stateName={stateNameMetrica}
                      onChangeCallback={onChange}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      );
    }
  }
);

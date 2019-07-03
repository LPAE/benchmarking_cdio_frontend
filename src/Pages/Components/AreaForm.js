import React from 'react';
import { Grid, Box, Typography, Radio, Collapse, Popover, Paper, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import RadioForm from './RadioForm';

const styles = theme => ({
  titulo: {
    margin: 'auto'
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
        <Grid container direction="column" alignItems="stretch" className="AreaForm">
          <Grid item className={classes.titulo}>
            <Typography justify="center" variant="h5">
              Área: {area.titulo}
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

          <Grid item>
            {mostrarMetrica && (
              <RadioForm
                row={this.getIndicador(area.item)}
                header={['Indicador', 'Prática', 'Performance']}
                descricao={this.getDescricao(area.item)}
                textoIndicador={this.getTextoIndicador(area.item)}
                state={stateMetrica}
                stateName={stateNameMetrica}
                onChangeCallback={onChange}
              />
            )}
          </Grid>
        </Grid>
      );
    }
  }
);

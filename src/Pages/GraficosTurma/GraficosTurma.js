import React from 'react';
import api from '../../Services/api';
import GraficosAreas from '../Components/GraficosAreas';
import { withStyles } from '@material-ui/core';
import { withLoadingTurma } from '../Components/withLoading';
import TopBar from '../Components/TopBar';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  }
});

export default withStyles(styles)(
  withLoadingTurma(
    class GraficosTurma extends React.Component {
      state = {
        turma: {},
        media: {},
        equipeIndex: 0,
      };

      constructor(props) {
        super(props);
        const { turma } = props;
        this.state = { turma: turma, equipeIndex: 0 };
        console.log(this.state)
      }

      addArea = (area1, area2) => {
        var soma = area1;
        for (const area in area2) {
          for (const key in area2[area]) {
            soma[area][key] += area[key];
            console.log(key);
          }
        }

        console.log(soma);
      };

      calcularMedia = equipes => {
        var soma = {};
      };

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <TopBar voltar title="Gráficos" history={this.props.history} />

            {this.state.turma.equipes && (
              <GraficosAreas equipe={this.state.turma.equipes[this.state.equipeIndex]} expectativa={this.state.turma.expectativa} />
            )}
          </div>
        );
      }
    }
  )
);

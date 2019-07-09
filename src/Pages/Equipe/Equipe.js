import React from 'react';
import GraficosAreas from '../Components/GraficosAreas';

import { Button, Grid } from '@material-ui/core';
import TopBar from '../Components/TopBar';
import { withStyles } from '@material-ui/styles';
import { withLoadingTurma } from '../Components/withLoading';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  }
});

export default withStyles(styles)(
  withLoadingTurma(
    class Equipe extends React.Component {
      state = {
        turma: {},
        equipeIndex: 0
      };

      constructor(props) {
        super(props);
        const { turma } = props;
        const equipeIndex = turma.equipes.findIndex(equipe => equipe.nome === `${this.props.match.params.equipe}`);
        this.state = { turma, equipeIndex };
      }

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <TopBar
              voltar
              title={this.state.turma.equipes && `Equipe: ${this.state.turma.equipes[this.state.equipeIndex].nome}`}
              history={this.props.history}
              addButtonCallback={e =>
                this.props.history.push(
                  `/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/${
                    this.state.turma.equipes[this.state.equipeIndex].nome
                  }/edit/`
                )
              }
            />
            <Grid container justify="center">
              {this.state.turma.equipes && (
                <GraficosAreas equipe={this.state.turma.equipes[this.state.equipeIndex]} expectativa={this.state.turma.expectativa} />
              )}
            </Grid>
          </div>
        );
      }
    }
  )
);

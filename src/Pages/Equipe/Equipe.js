import React from 'react';
import api from '../../Services/api';
import GraficosAreas from '../Components/GraficosAreas';

import './Equipe.sass';
import { Button, Grid } from '@material-ui/core';
import TopBar from '../Components/TopBar';

export default class Equipe extends React.Component {
  state = {
    turma: {},
    equipeIndex: 0
  };

  //  TODO: NÃO DAR REQUEST PRO BANCO DE DADOS NOVAMENTE

  async componentDidMount() {
    const curso = this.props.match.params.curso;
    const projeto = this.props.match.params.projeto;
    const semestre = this.props.match.params.semestre;
    const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
    const equipeIndex = turma.data.equipes.findIndex(equipe => equipe.nome === `${this.props.match.params.equipe}`);
    this.setState({ turma: turma.data, equipeIndex });
  }

  render() {
    return (
      <Grid container className="Equipe">
        <TopBar
          voltar
          title={this.state.turma.equipes && `Equipe: ${this.state.turma.equipes[this.state.equipeIndex].nome}`}
          history={this.props.history}
        />
        <Grid container justify="flex-end">
          <Grid item className="AdicionarAreaButton">
            <Button
              variant="outlined"
              color="primary"
              onClick={e =>
                this.props.history.push(
                  `/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/${
                    this.state.turma.equipes[this.state.equipeIndex].nome
                  }/edit/`
                )
              }
            >
              Adicionar Área
            </Button>
          </Grid>
        </Grid>
        {this.state.turma.equipes && (
          <GraficosAreas equipe={this.state.turma.equipes[this.state.equipeIndex]} expectativa={this.state.turma.expectativa} />
        )}
      </Grid>
    );
  }
}

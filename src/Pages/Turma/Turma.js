import React from 'react';
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core';
import { Group, GroupAdd } from '@material-ui/icons';

import './Turma.sass';
import api from '../../Services/api';

export default class Turma extends React.Component {
  state = {
    turma: {}
  };

  async componentDidMount() {
    const curso = this.props.match.params.curso;
    const projeto = this.props.match.params.projeto;
    const semestre = this.props.match.params.semestre;
    const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
    this.setState({ turma: turma.data });
  }

  enterEquipeButton = e => {
    this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/${e.target.textContent}`);
  };

  addEquipeButton = () => {
    this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/add`);
  };

  editExpectativaButton = () => {
    this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/edit`);
  };

  gerarGraficosButton = () => {
    this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/graficos`);
  };

  render() {
    return (
      <div className="Turma">
        <header>
          <div className="VoltarButton">
            <Button variant="contained" onClick={e => this.props.history.push('/')}>
              Início
            </Button>
          </div>
          <div>
            <h1 className="Curso">Curso: {this.state.turma.curso}</h1>
            <h1 className="Curso">Projeto: {this.state.turma.projeto}</h1>
            <h1 className="Curso">Semestre: {this.state.turma.semestre}</h1>
          </div>
        </header>

        <div className="EquipesPanel">
          <ul>
            {this.state.turma.equipes &&
              this.state.turma.equipes.map((equipe, index) => (
                <li key={index}>
                  <Button variant="contained" name={equipe.nome} onClick={this.enterEquipeButton}>
                    <Group />
                    {equipe.nome}
                  </Button>
                </li>
              ))}
            <li key="0">
              <Button variant="contained" onClick={this.addEquipeButton}>
                <GroupAdd />
                Adicionar Equipe
              </Button>
            </li>
          </ul>
        </div>
        <div className="EditarExpectativaButton" onClick={this.editExpectativaButton}>
          <Button variant="contained">Editar Expectativa</Button>
        </div>
        <div className="GerarGraficosButton" onClick={this.gerarGraficosButton}>
          <Button variant="contained">Gerar Graficos</Button>
        </div>
      </div>
    );
  }
}

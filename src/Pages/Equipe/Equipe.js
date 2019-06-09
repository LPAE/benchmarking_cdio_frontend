import React from 'react';
import api from '../../Services/api';
import GraficosAreas from '../Components/GraficosAreas';

import './Equipe.sass';

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
      <div className="Turma">
        <div className="VoltarButton">
          <button onClick={e => this.props.history.go(-1)}>Voltar</button>
        </div>
        <div>
          <h2>Radar Example</h2>
          {this.state.turma.equipes && (
            <GraficosAreas equipe={this.state.turma.equipes[this.state.equipeIndex]} expectativa={this.state.turma.expectativa} />
          )}
        </div>
      </div>
    );
  }
}

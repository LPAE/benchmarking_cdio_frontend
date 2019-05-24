import React from 'react';

import './Turma.sass';
import api from '../../Services/api';

export default class Turma extends React.Component {
  state = {
    turma: {}
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const turma = await api.get(`/id/${id}`);
    this.setState({ turma: turma.data });
  }

  addEquipe = () => {
    this.props.history.push(`/turma/${this.state.turma.id}/add`);
  };

  render() {
    return (
      <div className="Turma">
        <div className="TurmaHeader">
          <div className="VoltarButton">
            <button>Inicio</button>
          </div>
          <div className="Titulo">Turma: {this.state.turma.id}</div>
        </div>

        <div className="EquipesPanel">
          <ul>
            {this.state.turma.equipes &&
              this.state.turma.equipes.map(equipe => (
                <li key={equipe._id}>
                  <button>{equipe.nome}</button>
                </li>
              ))}
            <li key="0">
              <button onClick={this.addEquipe}>Adicionar Equipe</button>
            </li>
          </ul>
        </div>

        <div className="GerarGraficosButton">
          <button>Gerar Graficos</button>
        </div>
      </div>
    );
  }
}

import React from 'react';
import api from '../../Services/api';
import GraficosAreas from '../Components/GraficosAreas';

export default class GraficosTurma extends React.Component {
  state = {
    turma: {},
    media: {}
  };

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

  async componentDidMount() {
    const curso = this.props.match.params.curso;
    const projeto = this.props.match.params.projeto;
    const semestre = this.props.match.params.semestre;
    const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
    this.addArea(turma.data.equipes[0].area,turma.data.equipes[1].area)
    const media = this.calcularMedia(turma.data.equipes);
    this.setState({ turma: turma.data, media });
  }

  render() {
    return (
      <div className="GraficosTurma">
        <div className="VoltarButton">
          <button onClick={e => this.props.history.go(-1)}>Voltar</button>
        </div>

        {this.state.turma.equipes && (
          <GraficosAreas equipe={this.state.turma.equipes[this.state.equipeIndex]} expectativa={this.state.turma.expectativa} />
        )}
      </div>
    );
  }
}

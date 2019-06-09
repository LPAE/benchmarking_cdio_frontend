import React from 'react';
import { Radar } from 'react-chartjs-2';
import api from '../../Services/api';

import './Equipe.sass';
import { areaDesign } from '../CDIO_Texts';

let options = {
  scale: {
    ticks: {
      max: 5,
      min: 0,
      stepSize: 1
    }
  }
};

export default class Equipe extends React.Component {
  state = {
    turma: {}
  };

  //  TODO: NÃO DAR REQUEST PRO BANCO DE DADOS NOVAMENTE
  async componentDidMount() {
    const curso = this.props.match.params.curso;
    const projeto = this.props.match.params.projeto;
    const semestre = this.props.match.params.semestre;
    const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
    this.setState({ turma: turma.data });

    const equipeIndex = this.state.turma.equipes.findIndex(equipe => equipe.nome === `${this.props.match.params.equipe}`);
    const data = this.mountAreaChartData(
      turma.data.equipes[equipeIndex].nome,
      turma.data.equipes[equipeIndex].area.concepcao,
      turma.data.expectativa.concepcao
    );
    this.setState({ data, equipeIndex });
  }

  mountAreaChartData = (equipeName, area, expectativa) => {
    const labels = Object.keys(area);
    const areaData = Object.values(area);
    const expectativaData = Object.values(expectativa);
    return {
      labels,
      datasets: [
        {
          label: equipeName,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: areaData
        },
        {
          label: 'Expectativa',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: expectativaData
        }
      ]
    };
  };

  render() {
    return (
      <div className="Turma">
        <div className="VoltarButton">
          <button onClick={e => this.props.history.go(-1)}>Voltar</button>
        </div>
        <div>
          <h2>Radar Example</h2>
          <Radar data={this.state.data} options={options} />
        </div>
      </div>
    );
  }
}

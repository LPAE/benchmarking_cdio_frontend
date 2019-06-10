import React from 'react';
import { Radar } from 'react-chartjs-2';

var options = {
  scale: {
    ticks: {
      max: 5,
      min: 0,
      stepSize: 1,
      showLabelBackdrop: false
    },
    pointLabels: {
      fontSize: 16
    },
    angleLines: {
      lineWidth: 2
    },
    gridLines: {
      lineWidth: 2,
      tickMarkLength: 30
    }
  }
};

export default class GraficosAreas extends React.Component {
  // TODO: FORÇAR ORDEM DAS LABELS
  // TODO: TROCAR COR PARA CADA ÁREA
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
    const nomeEquipe = this.props.equipe.nome;
    const expectativa = this.props.expectativa;
    const dataConcepcao = this.props.equipe.area.concepcao;
    const dataDesign = this.props.equipe.area.design;
    const dataImplementacao = this.props.equipe.area.implementacao;
    const dataOperacao = this.props.equipe.area.operacao;
    return (
      <div className="GraficosAreas">
        {dataConcepcao && expectativa.concepcao && (
          <>
            <h2>Concepção</h2>
            <Radar data={this.mountAreaChartData(nomeEquipe, dataConcepcao, expectativa.concepcao)} options={options} />
          </>
        )}
        {dataDesign && expectativa.design && (
          <>
            <h2>Design</h2>
            <Radar data={this.mountAreaChartData(nomeEquipe, dataDesign, expectativa.design)} options={options} />
          </>
        )}
        {dataImplementacao && expectativa.implementacao && (
          <>
            <h2>Implementação</h2>
            <Radar data={this.mountAreaChartData(nomeEquipe, dataImplementacao, expectativa.implementacao)} options={options} />
          </>
        )}
        {dataOperacao && expectativa.operacao && (
          <>
            <h2>Operação</h2>
            <Radar data={this.mountAreaChartData(nomeEquipe, dataOperacao, expectativa.operacao)} options={options} />
          </>
        )}
      </div>
    );
  }
}

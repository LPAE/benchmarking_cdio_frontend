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
    },
    scaleLabel: {
      display: false
    }
  }
};

export default class GraficosAreas extends React.Component {
  // TODO: FORÇAR ORDEM DAS LABELS

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
      <div>
        <Radar
          data={this.mountAreaChartData(this.props.equipe.nome, this.props.equipe.area.concepcao, this.props.expectativa.concepcao)}
          options={options}
        />
        {this.props.equipe.area.design && this.props.expectativa.design && (
          <Radar
            data={this.mountAreaChartData(this.props.equipe.nome, this.props.equipe.area.design, this.props.expectativa.design)}
            options={options}
          />
        )}
      </div>
    );
  }
}

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Grid, Typography } from '@material-ui/core';

// TODO: TAMANHO DINÂMICO E PADDING DO TÍTULO

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

const concepcaoColor = 'rgba(255,99,132,0.2)';
const concepcaoBorderColor = 'rgba(255,99,132,1)';
const designColor = 'rgba(255,140,64,0.2)';
const designBorderColor = 'rgba(255,140,64,1)';
const implementacaoColor = 'rgba(106,199,40,0.2)';
const implementacaoBorderColor = 'rgba(106,199,40,1)';
const operacaoColor = 'rgba(164,40,194,0.2)';
const operacaoBorderColor = 'rgba(164,40,194,1)';

const colors = {
  concepcao: {
    backgroundColor: concepcaoColor,
    borderColor: concepcaoBorderColor,
    pointBackgroundColor: concepcaoBorderColor
  },
  design: {
    backgroundColor: designColor,
    borderColor: designBorderColor,
    pointBackgroundColor: designBorderColor
  },
  implementacao: {
    backgroundColor: implementacaoColor,
    borderColor: implementacaoBorderColor,
    pointBackgroundColor: implementacaoBorderColor
  },
  operacao: {
    backgroundColor: operacaoColor,
    borderColor: operacaoBorderColor,
    pointBackgroundColor: operacaoBorderColor
  }
};
export default class GraficosAreas extends React.Component {
  mountAreaChartData = (equipeName, area, expectativa, colors) => {
    const labels = Object.keys(area);
    const areaData = Object.values(area);
    const expectativaData = Object.values(expectativa);
    return {
      labels,
      datasets: [
        {
          label: equipeName,
          data: areaData,
          ...colors
        },
        {
          label: 'Expectativa',
          data: expectativaData,
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)'
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
      <Grid xs={12} sm={10} direction="column" alignItems="center" container className="GraficosAreas">
        <Grid container justify="center">
          {dataConcepcao && expectativa.concepcao && (
            <>
              <Grid item>
                <Typography>Concepção</Typography>
              </Grid>
              <Radar data={this.mountAreaChartData(nomeEquipe, dataConcepcao, expectativa.concepcao, colors.concepcao)} options={options} />
            </>
          )}
        </Grid>
        <Grid container justify="center">
          {dataDesign && expectativa.design && (
            <>
              <Grid item>
                <Typography>Design</Typography>
              </Grid>
              <Radar data={this.mountAreaChartData(nomeEquipe, dataDesign, expectativa.design, colors.design)} options={options} />
            </>
          )}
        </Grid>
        <Grid container justify="center">
          {dataImplementacao && expectativa.implementacao && (
            <>
              <Grid item>
                <Typography>Implementação</Typography>
              </Grid>
              <Radar
                data={this.mountAreaChartData(nomeEquipe, dataImplementacao, expectativa.implementacao, colors.implementacao)}
                options={options}
              />
            </>
          )}
        </Grid>
        <Grid container justify="center">
          {dataOperacao && expectativa.operacao && (
            <>
              <Grid item>
                <Typography>Operação</Typography>
              </Grid>
              <Radar data={this.mountAreaChartData(nomeEquipe, dataOperacao, expectativa.operacao, colors.operacao)} options={options} />
            </>
          )}
        </Grid>
      </Grid>
    );
  }
}

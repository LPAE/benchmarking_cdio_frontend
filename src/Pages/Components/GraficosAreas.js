import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Grid, Typography, Paper, withStyles, withWidth } from '@material-ui/core';

// TODO: TAMANHO DINÂMICO E PADDING DO TÍTULO

const styles = theme => ({
  RadarPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
    // position: 'relative',
  },
  RadarGrid: {
    position: 'relative',
    margin: 'auto',
    width: '100%',
    height: '500px',
    [theme.breakpoints.down('xs')]: {
      height: '300px'
    }
  }
});

var options = {
  scale: {
    ticks: {
      max: 5,
      min: 0,
      stepSize: 1,
      showLabelBackdrop: false
    },
    pointLabels: {
      fontSize: 8
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
  },
  maintainAspectRatio: false
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

const mountAreaChartData = (equipeName, area, expectativa, colors) => {
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

const RadarPlot = props => {
  const { classes, title, data, expectativa, nomeEquipe, colors } = props;
  return (
    <>
      {data && expectativa && (
        <Paper className={classes.RadarPaper}>
          <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
              <Typography align="center">{title}</Typography>
            </Grid>
            <Grid item className={classes.RadarGrid}>
              <Radar data={mountAreaChartData(nomeEquipe, data, expectativa, colors)} options={options} />
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default withStyles(styles)(
  withWidth()(
    class GraficosAreas extends React.Component {
      render() {
        const nomeEquipe = this.props.equipe.nome;
        const expectativa = this.props.expectativa;
        const dataConcepcao = this.props.equipe.area.concepcao;
        const dataDesign = this.props.equipe.area.design;
        const dataImplementacao = this.props.equipe.area.implementacao;
        const dataOperacao = this.props.equipe.area.operacao;
        const { classes, width } = this.props;


        // Para deixar a fonte menor em tela pequena.
        // TODO: Achar um jeito melhor de se fazer isso
        options.scale.pointLabels.fontSize = width === 'xs' ? 8 : 14;

        return (
          <Grid container item xs={12} sm={10} lg={8} direction="column" alignItems="stretch" className="GraficosAreas">
            <RadarPlot
              title="Concepção"
              data={dataConcepcao}
              expectativa={expectativa.concepcao}
              nomeEquipe={nomeEquipe}
              colors={colors.concepcao}
              classes={classes}
            />

            <RadarPlot
              title="Design"
              data={dataDesign}
              expectativa={expectativa.design}
              nomeEquipe={nomeEquipe}
              colors={colors.design}
              classes={classes}
            />

            <RadarPlot
              title="Implementação"
              data={dataImplementacao}
              expectativa={expectativa.implementacao}
              nomeEquipe={nomeEquipe}
              colors={colors.implementacao}
              classes={classes}
            />

            <RadarPlot
              title="Operação"
              data={dataOperacao}
              expectativa={expectativa.operacao}
              nomeEquipe={nomeEquipe}
              colors={colors.operacao}
              classes={classes}
            />
          </Grid>
        );
      }
    }
  )
);

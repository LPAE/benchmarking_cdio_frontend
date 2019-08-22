import React from 'react';
import GraficosAreas from '../Components/GraficosAreas';
import { Grid, Paper, withStyles, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@material-ui/core';
import { withLoadingTurma } from '../Components/withLoading';
import TopBar from '../Components/TopBar';
import { Group, InsertChart } from '@material-ui/icons';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  }
});

function MostrarGraficos(props) {
  const { turma, itemSelected } = props;
  if (itemSelected === mediaTurmaString) {
    const equipeMedia = calculateMediaTurma(turma);
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">{itemSelected}</Typography>
        <GraficosAreas equipe={equipeMedia} expectativa={props.turma.expectativa} />
      </Grid>
    );
  } else {
    const equipeIndex = turma.equipes.findIndex(equipe => equipe.nome === itemSelected);
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">{itemSelected}</Typography>
        <GraficosAreas equipe={turma.equipes[equipeIndex]} expectativa={props.turma.expectativa} />
      </Grid>
    );
  }
}

function calculateMediaTurma(turma) {
  let areaMedia = {};
  ['concepcao', 'design', 'implementacao', 'operacao'].forEach(area => {
    const media = calculateMediaArea(area, turma.equipes);
    if (areaMedia !== 0) areaMedia[area] = media;
  });
  const equipeMedia = { nome: 'Média', area: areaMedia };
  return equipeMedia;
}

function calculateMediaArea(areaArg, equipes) {
  const equipesWithArea = equipes.filter(equipe => equipe.area.hasOwnProperty(areaArg));
  if (equipesWithArea.length && equipesWithArea.length !== 0) {
    const keys = Object.keys(equipesWithArea[0].area[areaArg]);
    let media = {};
    if (Object.entries(keys).length !== 0) {
      const size = equipesWithArea.length;
      keys.forEach(key => {
        media[key] =
          equipesWithArea.reduce((acc, cur) => {
            if (cur.area.hasOwnProperty(areaArg)) {
              return acc + parseFloat(cur.area[areaArg][key]);
            } else return acc;
          }, 0.0) / size;
      });
    }
    return media;
  }
}

function calculateMediaMetrica(areaArg, equipes) {
  const equipesWithArea = equipes.filter(equipe => equipe.area.hasOwnProperty(areaArg));
  if (equipesWithArea.length && equipesWithArea.length !== 0) {
    const keys = Object.keys(equipesWithArea[0].area[areaArg]);
    let media = {};
    if (Object.entries(keys).length !== 0) {
      const size = equipesWithArea.length;
      keys.forEach(key => {
        media[key] =
          equipesWithArea.reduce((acc, cur) => {
            if (cur.area.hasOwnProperty(areaArg)) {
              return acc + parseFloat(cur.area[areaArg][key]);
            } else return acc;
          }, 0.0) / size;
      });
    }
    return media;
  } else return 0;
}
const mediaTurmaString = 'Média da Turma';

export default withStyles(styles)(
  withLoadingTurma(
    class GraficosTurma extends React.Component {
      state = {
        turma: {},
        media: {}
      };

      constructor(props) {
        super(props);
        const { turma } = props;
        this.state = { turma: turma, itemSelected: mediaTurmaString };
        console.log(this.state);
      }

      handleTabsChange = e => {
        if (e.target.textContent !== undefined) this.setState({ itemSelected: e.target.textContent });
      };

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <TopBar voltar title="Gráficos" history={this.props.history} />
            <Grid container direction="row" justify="center" alignItems="flex-start">
              <Grid item xs={12} sm={3} className={classes.list}>
                <Paper elevation={3}>
                  <List>
                    <ListItem button onClick={this.handleTabsChange}>
                      <ListItemIcon>
                        <InsertChart />
                      </ListItemIcon>
                      <ListItemText primary={mediaTurmaString} />
                    </ListItem>
                    <Divider />
                    {this.state.turma.equipes &&
                      this.state.turma.equipes.map((equipe, index) => (
                        <ListItem key={index} button onClick={this.handleTabsChange}>
                          <ListItemIcon>
                            <Group />
                          </ListItemIcon>
                          <ListItemText primary={equipe.nome} />
                        </ListItem>
                      ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MostrarGraficos turma={this.state.turma} itemSelected={this.state.itemSelected} />
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  )
);

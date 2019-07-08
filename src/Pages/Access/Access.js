import React from 'react';
import { Grid, Box, Typography, Paper, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { groupBy } from 'lodash';
import TopBar from '../Components/TopBar';
import cursos from '../Cursos';
import api from '../../Services/api';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  },
  title: { margin: theme.spacing(4, 0) },
  accessBox: {
    maxWidth: '1000px', // tamanho fixo para telas grandes
    margin: theme.spacing(2,4)
  },
  buttonSemestre: {}
});

const ExpandItens = props => (
  <>
    {props.itens &&
      Object.keys(props.itens).map((item, index) => (
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction="column" justify="flex-start" alignItems="stretch">
              <props.child turmas={props.itens[item]} history={props.history} classes={props.classes} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
  </>
);

const AccessSemestres = props => {
  return (
    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
      {props.turmas &&
        props.turmas.map((turma, index) => (
          <Button key={index} onClick={e => props.history.push(`/turma/${turma.curso}/${turma.projeto}/${turma.semestre}`)}>
            {turma.semestre}
          </Button>
        ))}
    </Grid>
  );
};

const AccessProjetos = props => {
  const projetos = groupBy(props.turmas, 'projeto');
  return <ExpandItens itens={projetos} child={AccessSemestres} history={props.history} classes={props.classes} />;
};

const AccessCursos = props => {
  const { classes } = props;
  const cursosPadroes = groupBy(props.turmas.filter(turma => turma.curso in cursos), 'curso');
  const outrosCursos = groupBy(props.turmas.filter(turma => !(turma.curso in cursos)), 'curso');
  return (
    <>
      <ExpandItens itens={cursosPadroes} child={AccessProjetos} history={props.history} classes={classes} />
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Outro</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <ExpandItens itens={outrosCursos} child={AccessProjetos} history={props.history} classes={classes} />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default withStyles(styles)(
  class Access extends React.Component {
    state = {
      turmas: []
    };

    async componentDidMount() {
      const turmas = await api.get(`/turma/`);
      this.setState({ turmas: turmas.data });
    }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <TopBar voltar title="Acesso" history={this.props.history} />
          <Typography className={classes.title} variant="h5" align="center">
            Curso:
          </Typography>
          <Grid container justify="center">
            <Box className={classes.accessBox} m={15}>
              {this.state.turmas && <AccessCursos turmas={this.state.turmas} history={this.props.history} classes={classes} />}
            </Box>
          </Grid>
        </div>
      );
    }
  }
);

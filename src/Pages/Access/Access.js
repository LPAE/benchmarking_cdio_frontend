import React from 'react';
import { Grid, Box, Typography, Paper, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { groupBy } from 'lodash';
import TopBar from '../Components/TopBar';
import cursos from '../Cursos';
import api from '../../Services/api';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  title: {margin: theme.spacing(4,0)},
  accessBox: {
    'max-width': '1200px', // tamanho fixo para telas grandes
    margin: 'auto'
  }
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
              <props.child turmas={props.itens[item]} history={props.history} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
  </>
);

const AccessSemestres = props => {
  return (
    <>
      {props.turmas &&
        props.turmas.map((turma, index) => (
          <Button key={index} onClick={e => props.history.push(`/turma/${turma.curso}/${turma.projeto}/${turma.semestre}`)}>{turma.semestre}</Button>
        ))}
    </>
  );
};

const AccessProjetos = props => {
  const projetos = groupBy(props.turmas, 'projeto');
  return <ExpandItens itens={projetos} child={AccessSemestres} history={props.history} />;
};

const AccessCursos = props => {
  const cursosPadroes = groupBy(props.turmas.filter(turma => turma.curso in cursos), 'curso');
  const outrosCursos = groupBy(props.turmas.filter(turma => !(turma.curso in cursos)), 'curso');
  return (
    <>
      <ExpandItens itens={cursosPadroes} child={AccessProjetos} history={props.history} />
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Outro</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <ExpandItens itens={outrosCursos} child={AccessProjetos} history={props.history} />
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
        <div className="Access">
          <TopBar voltar title="Acesso" history={this.props.history} />
          <Typography className={classes.title} variant="h5" align="center">Curso:</Typography>
          <Box className={classes.accessBox} m={5}>{this.state.turmas && <AccessCursos turmas={this.state.turmas} history={this.props.history} />}</Box>
        </div>
      );
    }
  }
);

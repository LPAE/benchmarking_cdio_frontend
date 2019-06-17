import React from 'react';
import { Grid, Box, Typography, Paper, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TopBar from '../Components/TopBar';
import api from '../../Services/api';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  descricao: { paddingTop: theme.spacing(2) },
  list: { paddingTop: theme.spacing(2) },
  editarExpectativa: { paddingTop: theme.spacing(2) },
  gerarGraficos: { paddingTop: theme.spacing(2) }
});

export default withStyles(styles)(
  class Turma extends React.Component {
    state = {
      turma: {}
    };

    async componentDidMount() {
      const curso = this.props.match.params.curso;
      const projeto = this.props.match.params.projeto;
      const semestre = this.props.match.params.semestre;
      const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
      this.setState({ turma: turma.data });
    }

    render() {
      const { classes } = this.props;
      return (
        <div className="Turma">
          <TopBar inicio title="Turma" {...this.props} />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography className={classes.heading}>Expansion Panel 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    }
  }
);

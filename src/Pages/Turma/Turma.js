import React from 'react';
import { Grid, Box, Typography, Paper, Button, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import { Group, GroupAdd } from '@material-ui/icons';
import TopBar from '../Components/TopBar';
import { withLoadingTurma } from '../Components/withLoading';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  },
  turmaContainer: {
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2)
    }
  },
  descricao: {
    color: theme.palette.text.secondary
  },
  list: { margin: theme.spacing(2) },
  editarExpectativa: {},
  gerarGraficos: {}
});

export default withStyles(styles)(
  withLoadingTurma(
    class Turma extends React.Component {
      state = {
        turma: {}
      };

      constructor(props) {
        super(props);
        this.state.turma = props.turma;
      }

      enterEquipeButton = e => {
        this.props.history.push(
          `/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/${e.target.textContent}`
        );
      };

      addEquipeButton = () => {
        this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/add`);
      };

      editExpectativaButton = () => {
        this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/edit`);
      };

      gerarGraficosButton = () => {
        this.props.history.push(`/turma/${this.state.turma.curso}/${this.state.turma.projeto}/${this.state.turma.semestre}/graficos`);
      };

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <TopBar inicio title="Turma" history={this.props.history} />
            <Grid container className={classes.turmaContainer} justify="space-evenly">
              <Grid
                item
                container
                spacing={4}
                xs={12}
                sm={4}
                direction="column"
                justify="flex-start"
                alignItems="center"
                className={classes.descricao}
              >
                <Grid item>
                  <Box>
                    <Typography variant="h4" className="Curso">
                      <b>Curso:</b> {this.state.turma.curso}
                    </Typography>
                    <Typography variant="h4" className="Curso">
                      <b>Projeto:</b> {this.state.turma.projeto}
                    </Typography>
                    <Typography variant="h4" className="Curso">
                      <b>Semestre:</b> {this.state.turma.semestre}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item className={classes.editarExpectativa} onClick={this.editExpectativaButton}>
                  <Button variant="contained" color="primary">
                    <Typography variant="h4">Editar Expectativa</Typography>
                  </Button>
                </Grid>
                <Grid item className={classes.gerarGraficos} onClick={this.gerarGraficosButton}>
                  <Button variant="contained" color="primary">
                    <Typography variant="h4">Gerar Graficos</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4} className={classes.list}>
                <Paper elevation={3}>
                  <List>
                    {this.state.turma.equipes &&
                      this.state.turma.equipes.map((equipe, index) => (
                        <ListItem key={index} button onClick={this.enterEquipeButton}>
                          <ListItemIcon>
                            <Group />
                          </ListItemIcon>
                          <ListItemText primary={equipe.nome} />
                        </ListItem>
                      ))}
                    <Divider />
                    <ListItem button onClick={this.addEquipeButton}>
                      <ListItemIcon>
                        <GroupAdd />
                      </ListItemIcon>
                      <ListItemText primary="Adicionar Equipe" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  )
);

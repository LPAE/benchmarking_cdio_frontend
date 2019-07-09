import React from 'react';

import api from '../../Services/api';

import AreasForm from '../Components/AreasForm';
import { FormControl, TextField, Paper } from '@material-ui/core';
import TopBar from '../Components/TopBar';
import Alert from '../Components/Alert';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  },
  addEquipeForm: { maxWidth: 500, margin: 'auto', marginBottom: theme.spacing(3) },
  addEquipeFormControl: {
    padding: theme.spacing(3)
  }
});

export default withStyles(styles)(
  class AddEquipe extends React.Component {
    state = {
      nomeDaEquipe: '',
      alert: false
    };

    submitAreasFormCallback = async areas => {
      if (this.state.nomeDaEquipe !== '') {
        const dataToSend = {
          curso: this.props.match.params.curso,
          projeto: this.props.match.params.projeto,
          semestre: this.props.match.params.semestre,
          equipe: { nome: this.state.nomeDaEquipe, area: { ...areas } }
        };
        await api.post('/turma/equipe', dataToSend, err => {
          if (err) console.log('Erro ao mandar nova Equipe');
        });
        this.props.history.push(
          `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
        );
      } else {
        this.setState({ alert: true });
      }
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <TopBar voltar title="Adicionar Equipe" history={this.props.history} />

          <div className="AddEquipeForm">
            <AreasForm callback={this.submitAreasFormCallback} mostrarDescricao>
              <Paper elevation={4} className={classes.addEquipeForm}>
                <FormControl className={classes.addEquipeFormControl}>
                  <TextField
                    label="Nome da Equipe"
                    value={this.state.nomeDaEquipe}
                    onChange={e => this.setState({ nomeDaEquipe: e.target.value })}
                    margin="normal"
                    variant="outlined"
                  />
                </FormControl>
              </Paper>
              <Alert text="Preencha o Nome da Equipe" open={this.state.alert} handleClose={e => this.setState({ alert: false })} />
            </AreasForm>
          </div>
        </div>
      );
    }
  }
);

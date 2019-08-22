import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';
import { withStyles } from '@material-ui/core';
import TopBar from '../Components/TopBar';
import { withLoadingTurma } from '../Components/withLoading';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  }
});

export default withStyles(styles)(
  withLoadingTurma(
    class EditEquipe extends React.Component {
      state = {
        turma: {},
        equipeIndex: 0,
        hideConcepcao: false,
        hideDesign: false,
        hideImplementacao: false,
        hideOperacao: false
      };

      constructor(props) {
        super(props);
        const { turma } = props;
        const equipeIndex = turma.equipes.findIndex(equipe => equipe.nome === `${this.props.match.params.equipe}`);
        this.state = { turma, equipeIndex };
        this.state.hideConcepcao = Object.keys(turma.equipes[equipeIndex].area).includes('concepcao') ? true : false;
        this.state.hideDesign = Object.keys(turma.equipes[equipeIndex].area).includes('design') ? true : false;
        this.state.hideImplementacao = Object.keys(turma.equipes[equipeIndex].area).includes('implementacao') ? true : false;
        this.state.hideOperacao = Object.keys(turma.equipes[equipeIndex].area).includes('operacao') ? true : false;
      }

      submitAreasFormCallback = async areas => {
        const dataToSend = {
          curso: this.props.match.params.curso,
          projeto: this.props.match.params.projeto,
          semestre: this.props.match.params.semestre,
          equipe: { nome: this.state.turma.equipes[this.state.equipeIndex].nome, area: { ...areas } }
        };
        await api.post('/turma/equipe/area', dataToSend);
        this.props.history.push(
          `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
        );
      };

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <TopBar
              voltar
              title={this.state.turma.equipes && `Adicionar Área na Equipe: ${this.state.turma.equipes[this.state.equipeIndex].nome}`}
              history={this.props.history}
            />
            <AreasForm
              callback={this.submitAreasFormCallback}
              mostrarDescricao
              hideConcepcao={this.state.hideConcepcao}
              hideDesign={this.state.hideDesign}
              hideImplementacao={this.state.hideImplementacao}
              hideOperacao={this.state.hideOperacao}
            />
          </div>
        );
      }
    }
  )
);

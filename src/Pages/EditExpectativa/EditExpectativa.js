import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';
import TopBar from '../Components/TopBar';
import { withStyles } from '@material-ui/core';
import { withLoadingTurma } from '../Components/withLoading';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  }
});

export default withStyles(styles)(
  withLoadingTurma(
    class EditExpectativa extends React.Component {
      state = {
        turma: {},

        concepcao: {},
        design: {},
        implementacao: {},
        operacao: {},

        concepcaoMetrica: {},
        designMetrica: {},
        implementacaoMetrica: {},
        operacaoMetrica: {},
      };

      constructor(props) {
        super(props);
        const { turma } = props;
        this.state.turma = turma;
        ['concepcao', 'design', 'implementacao', 'operacao'].forEach(
          item => (this.state[item] = Object.keys(turma.expectativa).includes(item) ? turma.expectativa[item] : null)
        );
        ['concepcao', 'design', 'implementacao', 'operacao'].forEach(
          item => (this.state[item + 'Metrica'] = Object.keys(turma.metrica).includes(item) ? turma.metrica[item] : null)
        );
        console.log(this.state);
      }

      submitAreasFormCallback = async (areas, metricas) => {
        const dataToSend = {
          curso: this.props.match.params.curso,
          projeto: this.props.match.params.projeto,
          semestre: this.props.match.params.semestre,
          expectativa: { ...areas },
          metrica: { ...metricas }
        };
        console.log(dataToSend);
        await api.post('/turma/config', dataToSend);
        this.props.history.push(
          `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
        );
      };

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <TopBar voltar title="Editar Expectativa" history={this.props.history} />

            <AreasForm
              callback={this.submitAreasFormCallback}
              concepcao={this.state.concepcao}
              design={this.state.design}
              implementacao={this.state.implementacao}
              operacao={this.state.operacao}
              mostrarMetrica
              concepcaoMetrica={this.state.concepcaoMetrica}
              designMetrica={this.state.designMetrica}
              implementacaoMetrica={this.state.implementacaoMetrica}
              operacaoMetrica={this.state.operacaoMetrica}
            />
          </div>
        );
      }
    }
  )
);
